import * as vscode from "vscode";
import { workflowGenerator_createNewWorkflow } from "../command-list";

export function createNewWorkflow(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(workflowGenerator_createNewWorkflow, () => {
      // todo: `Implement "Create new workflow" functionlity`
      vscode.window.showWarningMessage(
        `Implement "Create new workflow" functionlity`
      );
    })
  );
}
