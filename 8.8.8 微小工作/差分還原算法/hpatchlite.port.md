# hpatchlite port <!-- {comment docsify-ignore-all} -->

---

將 hdiffpatch.hpatchlite & tinyuz 移植至單片機 bare metal 裸機系統（based on hdiffpatch v4）

---

## 拿來

將 tinyuz/decompress 目錄拷貝至目標工程中。

將 HDiffPatch/libHDiffPatch/HPatch 目錄拷貝至目標工程中。

將 HDiffPatch/libHDiffPatch/HPatchLite 目錄拷貝至目標工程中。

將 HPatchLite/decompresser_demo.h 文件拷貝至目標工程中。

<br>

## 畫瓢

依 HPatchLite/hpatchi.c/hpatchi() 函數畫瓢：移植還原功能

依 tinyuz/tinyuz_demo.cpp/_tuz_decompress_stream() 函數畫瓢：移植解壓功能

done!

<br>

## 詳析

拿來依葫蘆畫瓢，說得簡單，做起來着實還是費了點功夫，這幾年搞嵌入式搞得有些侷限了，面對句(gōu)柄這種用法竟感覺無從下手。😅

作者提供了以下兩個接口函數：

```
hpatch_lite_open()

hpatch_lite_patch()
```

看着挺簡單的吧，然而他實際上是這樣的：

```
// hpatch_lite by stream: hpatch_lite_open()+hpatch_lite_patch() compiled by Mbed Studio is 662 bytes
//   hdiffpatch v4.2.3, other patcher compiled by Mbed Studio:
//      patch_single_stream() 2356 bytes (hpatch_StreamPos_t=hpatch_uint32_t)
//      patch_decompress_with_cache() 2846 bytes (_IS_NEED_CACHE_OLD_BY_COVERS=0,hpatch_StreamPos_t=hpatch_uint32_t)

//diff_data must created by create_lite_diff()

typedef struct hpatchi_listener_t{
    hpi_TInputStreamHandle  diff_data;
    hpi_TInputStream_read   read_diff;
    //must read data_size data to out_data, from read_from_pos of stream; if read error return hpi_FALSE;
    hpi_BOOL (*read_old)(struct hpatchi_listener_t* listener,hpi_pos_t read_from_pos,hpi_byte* out_data,hpi_size_t data_size);
    //must write data_size data to sequence stream; if write error return hpi_FALSE;
    hpi_BOOL (*write_new)(struct hpatchi_listener_t* listener,const hpi_byte* data,hpi_size_t data_size);
} hpatchi_listener_t;

//hpatch_lite open
// read lite headinfo from diff_data
// if diff_data uncompress(*out_compress_type==hpi_compressType_no), *out_uncompressSize==0;
// if (*out_compress_type!=hpi_compressType_no), you need open compressed data by decompresser
//      (see https://github.com/sisong/HPatchLite/decompresser_demo.h & https://github.com/sisong/HPatchLite/hpatchi.c)
hpi_BOOL hpatch_lite_open(hpi_TInputStreamHandle diff_data,hpi_TInputStream_read read_diff,
                          hpi_compressType* out_compress_type,hpi_pos_t* out_newSize,hpi_pos_t* out_uncompressSize);
//hpatch_lite patch
//	used temp_cache_size memory + {decompress buffer*1}
//  note: temp_cache_size>=hpi_kMinCacheSize
hpi_BOOL hpatch_lite_patch(hpatchi_listener_t* listener,hpi_pos_t newSize,
                           hpi_byte* temp_cache,hpi_size_t temp_cache_size);
```

<br>

試着分析一下：

<br>

**差分包頭信息讀取接口**

```
/** 差分包頭信息讀取接口
 *
 * @param hpi_TInputStreamHandle        diff_data           注意此處入參：差分數據流句柄（個人理解：如果不需要該句柄的話可以將其定義爲空指針）
 * @param hpi_TInputStream_read         read_diff           注意此處入參：差分數據流讀取函數（用戶實現：以數據流的方式讀取外部存儲中差分數據分區的數據）
 * @param hpi_compressType             *out_compress_type   差分包頭信息：差分包壓縮類型
 * @param hpi_pos_t                    *out_newSize         差分包頭信息：還原數據的長度
 * @param hpi_pos_t                    *out_uncompressSize  差分包頭信息：解壓之後的長度（如果差分包未被壓縮則*out_uncompressSize輸出0）
**/
hpi_BOOL hpatch_lite_open(hpi_TInputStreamHandle diff_data,hpi_TInputStream_read read_diff,hpi_compressType* out_compress_type,hpi_pos_t* out_newSize,hpi_pos_t* out_uncompressSize);
```

**差分包頭定義**

```
#define hpi_kHeadSize (2+1+1) //"hI" + hpi_compressType + (versionCode + newSize_Bytes + uncompressSize_Bytes) { + newSize + uncompressSize} { + dictSize}
差分包頭[0] : 魔術數字 68 'h'
差分包頭[1] : 魔術數字 49 'I'
差分包頭[2] : 壓縮類型
差分包頭[3] : 版本代碼[7:6]+解壓數據長度所佔的字節數u[5:3]+還原數據長度所佔的字節數n[2:0]
差分包頭[4 ~ 4+n] : 還原數據長度
差分包頭[? ~ ?+u] : 解壓數據長度

壓縮包頭[? ~ ?+4] : 壓縮字典大小
```

**差分還原接口**

```
/** 差分還原接口
 *
 * @param hpatchi_listener_t            listener            詳見 hpatchi_listener_t 分析
 * @param hpi_pos_t                     newSize             還原數據的長度
 * @param hpi_byte                     *temp_cache          還原緩衝的地址
 * @param hpi_size_t                    temp_cache_size     還原緩衝的大小（>=2）
**/
hpi_BOOL hpatch_lite_patch(hpatchi_listener_t* listener,hpi_pos_t newSize,hpi_byte* temp_cache,hpi_size_t temp_cache_size);
```

**hpatchi_listener_t**

```
typedef struct hpatchi_listener_t
{
    hpi_TInputStreamHandle  diff_data;
    hpi_TInputStream_read   read_diff;
    hpi_BOOL (*read_old)(struct hpatchi_listener_t* listener,hpi_pos_t read_from_pos,hpi_byte* out_data,hpi_size_t data_size);
    hpi_BOOL (*write_new)(struct hpatchi_listener_t* listener,const hpi_byte* data,hpi_size_t data_size);
} hpatchi_listener_t;
```

**hpatchi_listener_t 實例（差分包未經壓縮）**

```
hpatchi_listener_t listener =
{
    .diff_data = 差分數據流句柄,
    .read_diff = 差分數據流讀取函數,    由用戶去實現（從外部存儲的差分數據分區讀取）（函數一）

    .read_old  = 舊版數據流讀取函數,    由用戶去實現（從內部存儲的舊版程序分區讀取）（函數二）
    .write_new = 還原數據流寫入函數,    由用戶去實現（寫入到外部存儲的還原程序分區）（函數三）
};
```

**hpatchi_listener_t 實例（差分包經過壓縮）**

```
tuz_TStream _tuz_stream = /* 壓縮數據流句柄 */
{
    .in_Stream = 差分數據流句柄,
    .read_code = 差分數據流讀取函數,    由用戶去實現（從外部存儲的差分數據分區讀取）（函數一）
}

hpatchi_listener_t listener =
{
    .diff_data = 壓縮數據流句柄,        _tuz_stream
    .read_diff = 壓縮數據流解壓函數,    _tuz_TStream_decompress() // decompresser_demo.h

    .read_old  = 舊版數據流讀取函數,    由用戶去實現（從內部存儲的舊版程序分區讀取）（函數二）
    .write_new = 還原數據流寫入函數,    由用戶去實現（寫入到外部存儲的還原程序分區）（函數三）
};
```

<br>

最後需要注意的一點是：

!> 使用 hpatch_lite_open() + hpatch_lite_patch() 的前提是：差分包必須由 create_lite_diff() 函數創建

也就是說，用於超小型嵌入式設備的差分包要通過 hdiffi.exe 程序生成，不能使用 hdiffz.exe 生成。

<br>

## 移植

```
hpi_BOOL 差分數據流讀取函數()
{
    由用戶實現
}

hpi_BOOL 舊版數據流讀取函數()
{
    由用戶實現
}

hpi_BOOL 還原數據流寫入函數()
{
    由用戶實現
}

// 根據 hpatch_lite_open() + hpatch_lite_patch() 編寫的還原程序
hpi_patch_result_t hpi_patch(接收到的差分包大小, “還原緩衝大小”, “解壓緩衝大小”)
{
    // 差分數據流句柄：如果不需要該句柄的話可以將其定義爲空指針
    hpatch_lite_open(“差分數據流句柄”, “差分數據流讀取函數”, 輸出“差分包信息”);


    解壓緩衝地址 = malloc();
    解壓字典大小 = _tuz_TStream_getReservedMemSize(“差分數據流句柄”, “差分數據流讀取函數”);
    tuz_TStream_open(_tuz_stream, “差分數據流句柄”, “差分數據流讀取函數”, “解壓緩衝地址”, “解壓字典大小”, “解壓緩衝大小”);


    patch_listener
        .diff_data = _tuz_stream
        .read_diff = _tuz_TStream_decompress() // decompresser_demo.h
        .read_old  = 舊版數據流讀取函數()
        .write_new = 還原數據流寫入函數()

    還原緩衝地址 = malloc();

    hpatch_lite_patch(“patch_listener”, “還原數據期望長度”, “還原緩衝地址”, “還原緩衝大小”);
}
```

<br>

## 源碼

```
/**
  ******************************************************************************
  * Copyright © 2023 刘汲桐. All rights reserved. https://sulfurandcu.github.io/
  ******************************************************************************
  * Note :
  ******************************************************************************
  * 2023-09-01  sulfurandcu@gmail.com   first release
  ******************************************************************************
  */

#ifndef __patcher_h__
#define __patcher_h__

#include <stddef.h>
#include "malloc.h"

#define hpi_malloc(x)                   mymalloc(x)
#define hpi_free(x)                     myfree(x)

int hpi_patch(size_t diff_file_size, size_t patch_cache_size, size_t decompress_cache_size); // (差分文件的大小, 差分缓冲大小, 解压缓冲大小)

#endif /* __patcher_h__ */
```

```
/**
  ******************************************************************************
  * Copyright © 2023 刘汲桐. All rights reserved. https://sulfurandcu.github.io/
  ******************************************************************************
  * Note :
  ******************************************************************************
  * 2023-09-01  sulfurandcu@gmail.com   first release
  ******************************************************************************
  */

#include "patcher.h"
#include "fal.h"
#include "hpatch_lite.h"
#include "patch_types.h"
#include "decompresser_demo.h"

static size_t patch_file_len = 0;
static size_t patch_file_rxd_pos = 0;
static size_t newer_file_txd_pos = 0;

// 从外部flash中以数据流的形式读取差分数据（由用户记录数据流的位置：读到哪儿了）（数据流结束时需要将 *data_size 置为当前所读数据的实际长度）（*data_size == decompress_cache_size）
static hpi_BOOL _do_read_diff(hpi_TInputStreamHandle input_stream, hpi_byte *data, hpi_size_t *data_size)
{
    // TODO 由用户实现
    if ((patch_file_rxd_pos + *data_size) > patch_file_len)
    {
        *data_size = patch_file_len - patch_file_rxd_pos;
    }
    const struct fal_partition *partition = fal_partition_find("patch_enc");
    int result = fal_partition_read(partition, 0x1000+0x4B+patch_file_rxd_pos, data, *data_size);
    patch_file_rxd_pos += *data_size;
    return hpi_TRUE;
}

// 从内部flash中以数据流的形式读取旧版程序
static hpi_BOOL _do_read_old(struct hpatchi_listener_t *listener, hpi_pos_t read_pos, hpi_byte *data, hpi_size_t data_size)
{
    // TODO 由用户实现
    const struct fal_partition *partition = fal_partition_find("exapp_old");
    int result = fal_partition_read(partition, read_pos, data, data_size);
    return hpi_TRUE;
}

// 将还原数据以数据流的形式写入外部flash中（由用户记录数据流的位置：写到哪儿了）
static hpi_BOOL _do_write_new(struct hpatchi_listener_t *listener, const hpi_byte *data, hpi_size_t data_size)
{
    // TODO 由用户实现
    const struct fal_partition *partition = fal_partition_find("exapp_new");
    int result = fal_partition_write(partition, newer_file_txd_pos, data, data_size);
    newer_file_txd_pos += data_size;
    return hpi_TRUE;
}

int hpi_patch(size_t diff_file_size, size_t patch_cache_size, size_t decompress_cache_size)
{
    int result = 0;
    hpi_byte* pmem = 0;
    hpi_byte* patch_cache;

    patch_file_len = diff_file_size;
    patch_file_rxd_pos = 0;
    newer_file_txd_pos = 0;

    hpi_TInputStreamHandle  void_stream_handle = NULL;
    hpi_TInputStream_read   diff_stream_read = _do_read_diff;
    hpi_compressType        compress_type;
    hpi_pos_t               new_size;
    hpi_pos_t               uncompress_size;

    hpatch_lite_open(void_stream_handle, diff_stream_read, &compress_type, &new_size, &uncompress_size);

    hpatchi_listener_t listener;
    listener.read_old  = _do_read_old;
    listener.write_new = _do_write_new;

    switch (compress_type)
    {
        case hpi_compressType_no:  // memory size: patch_cache_size
        {
            pmem = (hpi_byte*)hpi_malloc(patch_cache_size);
            patch_cache = pmem;

            listener.diff_data = void_stream_handle;
            listener.read_diff = diff_stream_read;
        } break;
    #ifdef _CompressPlugin_tuz
        case hpi_compressType_tuz:  // requirements memory size: patch_cache_size + decompress_cache_size + decompress_dict_size
        {
            tuz_TStream tuz_stream_handle;

            size_t decompress_dict_size  = _tuz_TStream_getReservedMemSize(void_stream_handle, diff_stream_read);

            pmem = (hpi_byte*)hpi_malloc(decompress_dict_size + decompress_cache_size + patch_cache_size);

            tuz_TStream_open(&tuz_stream_handle, void_stream_handle, diff_stream_read, pmem, (tuz_size_t)decompress_dict_size, (tuz_size_t)decompress_cache_size);

            patch_cache = pmem + decompress_dict_size + decompress_cache_size;

            listener.diff_data = &tuz_stream_handle;
            listener.read_diff = _tuz_TStream_decompress;
        } break;
    #endif
        default:
        {
            goto clear;
        }
    }

    hpatch_lite_patch(&listener, new_size, patch_cache, (hpi_size_t)patch_cache_size);

clear:
    if (pmem) { hpi_free(pmem); pmem=0; }
    return result;
}
```

?> 爲了使代碼看起來更加簡潔，因此例程中沒有進行任何異常處理。
