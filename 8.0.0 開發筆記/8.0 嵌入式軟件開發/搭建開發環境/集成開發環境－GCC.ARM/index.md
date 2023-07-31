# 集成開發環境－GCC.ARM <!-- {docsify-ignore-all} -->

---

本章我們來深入學習一下嵌入式領域中開源的集成開發環境。

---

傳統的集成開發環境通常會提供包括編輯、編譯、燒錄、調試在內的一套工具集，開發者基本不需要配置，打開即可使用。而開源方案（vscode/eclipse）則是給出一個基礎框架，開發者根據自己的需要去配置各種工具鏈。

目前較爲常見的開源方案有：

<font face="Iosevka Fixed Slab">

- **VSC**
  - [Microsoft Embedded Tools](https://devblogs.microsoft.com/cppblog/vscode-embedded-development/)
  - [Cortex Debug](https://github.com/Marus/cortex-debug/wiki)
  - [Embedded IDE](https://em-ide.com/zh-cn/)
  - [vscode for espidf](https://docs.espressif.com/projects/esp-idf/zh_CN/v4.3.1/esp32/index.html)
  - [vscode for essemi](https://www.essemi.com/index/article/plist?cid=141)
- **VS**
  - [Microsoft Embedded Software Development in Visual Studio](https://devblogs.microsoft.com/cppblog/visual-studio-embedded-development/)
  - [VisualGDB by SysPROGS](https://visualgdb.com/)
- **Eclipse**
- **Eclipse Based**
  - [EclipseBased: RT-Thread Studio](https://www.rt-thread.io/studio.html) (RV5 ARM JLink STLink DAP-Link QEMU)
  - [EclipseBased: MounRiver Studio](http://www.mounriver.com/) (RV5 ARM)
  - [EclipseBased: NucleiIDE Studio](https://www.rvmcu.com/nucleistudio.html) (RV5)

</font>

<br>

以 vscode 爲基礎，搭建一個可以替換 Keil MDK 的開發環境，需要用到：

1. 編輯功能（vscode）
2. 編譯功能（arm-none-eabi-xxx）
3. 燒錄功能（OpenOCD/JLink）
4. 調試功能（OpenOCD/JLinkGDBServerCL + Cortex-Debug + arm-none-eabi-gdb）

- **vscode**<br>
文本編輯器，其實是一個僞裝成文本編輯器的開發框架。

- **arm-none-eabi-xxx**<br>
交叉編譯器，可以編譯出在 Cortex-R&M 平臺上運行的可執行程序。

- **OpenOCD/JLink**<br>
程序燒錄器，負責將編譯好的程序燒錄到目標芯片中。

- **arm-none-eabi-gdb**<br>
命令調試器，支持通過命令行的方式進行調試。

- **Cortex-Debug**<br>
圖形調試器，提供一套圖形調試界面，需要與命令調試器搭配使用。

- **OpenOCD/JLinkGDBServerCL**<br>
調試服務器，負責協助調試器識別並管理各種仿真設備和目標芯片。

- **makefile & task.json**<br>
自動化工具，用來實現編譯和燒錄的自動化。

?>倘若宿主機使用 Windows 操作系統並且購買了 JLinkDebugger 仿真器，則推薦使用 JLink 方案！
