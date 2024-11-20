import * as vscode from "vscode";
import { workflower_createNewWorkflow } from "../command-list";

export function createNewWorkflow(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(workflower_createNewWorkflow, () => {
      // todo: `Implement "Create new workflow" functionlity`
      vscode.window.showWarningMessage(
        `Implement "Create new workflow" functionlity`
      );
    })
  );
}
