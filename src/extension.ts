import * as vscode from "vscode";
import { workflowTreeApplication } from "./features/workflow-tree-application";

export async function activate(context: vscode.ExtensionContext) {
  console.log(`"Workflower" is now active!`);

  workflowTreeApplication(context);
}

export async function deactivate() {
  console.log(`"Workflower" is deactivated!`);
}
