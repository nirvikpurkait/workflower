import * as vscode from "vscode";
import { workflowTreeApplication } from "./application/workflow-tree";

export async function activate(context: vscode.ExtensionContext) {
  console.log(`"Workflow Generator" is now active!`);

  workflowTreeApplication(context);
}

export async function deactivate() {
  console.log(`"Workflow Generator" is deactivated!`);
}
