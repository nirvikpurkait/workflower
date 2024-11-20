import fs from "node:fs";
import path from "node:path";
import * as vscode from "vscode";
import { workflower_openWorkflowInEditor } from "../command-list";

/**
 * create a workflow tree provider
 */
export class WorkflowFileTreeProvider
  implements vscode.TreeDataProvider<WorkflowFileTreeItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    WorkflowFileTreeItem | undefined | void
  > = new vscode.EventEmitter<WorkflowFileTreeItem | undefined | void>();

  readonly onDidChangeTreeData: vscode.Event<
    WorkflowFileTreeItem | undefined | void
  > = this._onDidChangeTreeData.event;

  constructor(private workflowFolderPath: string) {}

  // method to refresh the tree provider
  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(
    element: WorkflowFileTreeItem
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(
    element?: WorkflowFileTreeItem
  ): vscode.ProviderResult<WorkflowFileTreeItem[]> {
    const fileTree = this.workflowFiles().map((ymlFileName) => {
      const filePath = path.join(this.workflowFolderPath, ymlFileName);
      // for each workflow file show the file item in view-tree
      return new WorkflowFileTreeItem(ymlFileName, filePath);
    });

    return fileTree;
  }

  // find all `.yml` files from `.github/workflows`
  private workflowFiles(): string[] {
    const workflowFilesList = fs
      .readdirSync(this.workflowFolderPath, {
        encoding: "utf-8",
      })
      // todo: find all valid yml files, i.e do not consider just `.yml` file as a valid file
      .filter((file) => file.endsWith(".yml"));

    return workflowFilesList;
  }
}

class WorkflowFileTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    ymlFilePath: string
  ) {
    super(label);

    this.collapsibleState = vscode.TreeItemCollapsibleState.None;
    this.iconPath = path.join(__filename, "../../../", "assets/icons/yml.svg");

    /**
     * onselect of this tree-item execute the following command
     */
    this.command = {
      command: workflower_openWorkflowInEditor,
      title: "",
      arguments: [label, ymlFilePath],
    };
  }
}
