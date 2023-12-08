1. F5 直接打开
2. 如果发现debugger之后没有运行插件，需要 `vsce package`打包一份，并通过"从VSIX安装"，之后，再次尝试F5
3. 如果发现没有vsce

   ```

   If you're getting the "zsh: command not found: vsce" error, it means that the vsce command-line tool is not installed or not available in your shell's PATH.

   vsce is the official Visual Studio Code extension manager tool. To resolve this issue, you can follow these steps:

   Install Node.js and npm:

   Make sure you have Node.js and npm (Node Package Manager) installed on your machine. You can download them from the official website: Node.js.
   Install vsce globally:

   Open your terminal (zsh) and run the following command to install vsce globally using npm:

   bash
   Copy code
   npm install -g vsce
   The -g flag installs the package globally so that the vsce command is available system-wide.

   Verify installation:

   After the installation is complete, you should be able to run the vsce command. Verify the installation by running:

   bash
   Copy code
   vsce --version
   This command should display the version number of vsce.

   Ensure npm global bin directory is in your PATH:

   Make sure that the npm global bin directory is in your shell's PATH. This directory is usually ~/.npm-global/bin for global npm installations.

   Add the following line to your ~/.zshrc file (or equivalent configuration file for your shell):

   bash
   Copy code
   export PATH="$PATH:$HOME/.npm-global/bin"
   Then, restart your terminal or run source ~/.zshrc to apply the changes.

   Now, you should be able to use the vsce command without encountering the "command not found" error. If you continue to experience issues, double-check the installation steps and ensure that npm's global bin directory is correctly added to your PATH.
   ```
4. ```
   你可以使用以下命令来列出全局安装的所有 npm 包：

   bash
   Copy code
   npm list -g --depth 0
   这个命令会列出全局安装的 npm 包的树状结构，其中 --depth 0 参数表示只显示顶层的包，而不显示其依赖关系。

   如果你想要列出本地（项目级别）安装的 npm 包，可以在项目根目录中运行类似的命令：

   bash
   Copy code
   npm list --depth 0
   这将显示项目本地安装的所有 npm 包。同样，--depth 0 参数表示只显示顶层的包。
   ```
