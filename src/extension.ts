import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "workflow-generator" is now active!'
  );

  const disposable = vscode.commands.registerCommand(
    "workflow-generator.generateWorkflow",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from workflow-generator!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
