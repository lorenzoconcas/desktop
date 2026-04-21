export enum RepositoryListGroupMode {
  Owner = 'owner',
  Folder = 'folder',
}

export interface IRepositoryListFolder {
  readonly id: string
  readonly name: string
}
