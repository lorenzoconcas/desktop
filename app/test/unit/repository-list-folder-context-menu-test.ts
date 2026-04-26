import assert from 'node:assert'
import { describe, it } from 'node:test'

import { IFoundEditor } from '../../src/lib/editors/found-editor'
import { buildRepositoryListFolderContextMenu } from '../../src/ui/repositories-list/repository-list-item-context-menu'

function createEditors(
  ...names: ReadonlyArray<string>
): ReadonlyArray<IFoundEditor<string>> {
  return names.map(editor => ({
    editor,
    path: `/Applications/${editor}.app`,
  }))
}

describe('buildRepositoryListFolderContextMenu', () => {
  it('adds one menu entry for each detected editor and forwards the chosen editor', () => {
    let openedEditor: string | null = null
    const items = buildRepositoryListFolderContextMenu(
      {
        commonParentPath: '/tmp/workspace',
        onOpenInSelectedExternalEditor: editor => {
          openedEditor = editor
        },
      },
      createEditors('Visual Studio Code', 'Zed')
    )

    const labels = items.map(item => item.label)
    const zedItem = items.find(item => item.label === 'Open in Zed')

    assert.deepEqual(labels, [
      '/tmp/workspace',
      undefined,
      'Open in Visual Studio Code',
      'Open in Zed',
    ])

    zedItem?.action?.()

    assert.equal(openedEditor, 'Zed')
  })

  it('shows a disabled placeholder when no editors are available', () => {
    const items = buildRepositoryListFolderContextMenu(
      {
        commonParentPath: null,
        onOpenInSelectedExternalEditor: () => {},
      },
      []
    )

    assert.equal(items.length, 1)
    assert.equal(
      items[0].label,
      __DARWIN__ ? 'No Editors Available' : 'No editors available'
    )
    assert.equal(items[0].enabled, false)
  })

  it('omits the path item when the virtual folder has no shared parent directory', () => {
    const items = buildRepositoryListFolderContextMenu(
      {
        commonParentPath: null,
        onOpenInSelectedExternalEditor: () => {},
      },
      createEditors('Visual Studio Code')
    )

    assert.deepEqual(
      items.map(item => item.label),
      ['Open in Visual Studio Code']
    )
  })
})
