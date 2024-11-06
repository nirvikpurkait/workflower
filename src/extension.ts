import * as vscode from "vscode";

export async function activate(context: vscode.ExtensionContext) {
  console.log(`"Workflow Generator" is now active!`);
}

export async function deactivate() {
  console.log(`"Workflow Generator" is deactivated!`);
}
