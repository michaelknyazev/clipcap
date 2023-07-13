/**
 * @typedef TTableColumnOptions
 * @type {Object}
 * @property {("xs"|"s"|"m"|"default"|"l"|"xl")} [size] - The size of the column.
 * @property {(value: TTableDataValue) => React.ReactNode} [render] - A custom render function for the column.
 */
export type TTableColumnOptions = {
  size?: "xs" | "s" | "m" | "default" | "l" | "xl",
  render?: (value: TTableDataValue, item: TTableData) => React.ReactNode
}
/**
 * @typedef TTableColumn
 * @type {Object}
 * @property {string} key - The unique key for the column.
 * @property {string|React.ReactNode} title - The title of the column.
 * @property {string} dataIndex - The index of the data source.
 * @property {TTableColumnOptions} options - The options for the column.
 */
export type TTableColumn = { 
  key: string,
  title: string | React.ReactNode,
  dataIndex: string,
  options: TTableColumnOptions
}
/**
 * @typedef TTableRawColumn
 * @type {Object}
 * @property {string} key - The unique key for the column.
 * @property {string|React.ReactNode} title - The title of the column.
 * @property {string} dataIndex - The index of the data source.
 * @property {string} className - The CSS class name for the column.
 */
export type TTableRawColumn = Omit<TTableColumn, "options"> & {
  className: string
}
/**
 * @typedef TTableDataValue
 * @type {string|string[]|number|number[]|React.ReactNode}
 */
export type TTableDataValue = string | string[] | number | number[] | React.ReactNode
/**
 * @typedef TTableData
 * @type {Object}
 * @property {TTableDataValue} [key] - The key-value pairs of table data.
 */
export type TTableData = {
  [key: string]: TTableDataValue
}
/**
 * @typedef TTableRawCell
 * @type {Object}
 * @property {string} key - The unique key for the cell.
 * @property {string} className - The CSS class name for the cell.
 * @property {TTableDataValue} content - The content of the cell.
 */
export type TTableRawCell = {
  key: string,
  className: string,
  content: TTableDataValue
}
/**
 * @typedef TTableRawItem
 * @type {Object}
 * @property {string} key - The unique key for the item.
 * @property {string} className - The CSS class name for the item.
 * @property {TTableRawCell[]} data - The array of raw cells in the item.
 */
export type TTableRawItem = {
  key: string,
  className: string
  data: TTableRawCell[],
  after?: React.ReactNode,
  before?: React.ReactNode,
  onClick?: () => void
}
/**
 * @typedef TTableIndexKey
 * @type {string}
 */
export type TTableIndexKey = string;
/**
 * @typedef TTable
 * @type {Object}
 * @property {string} indexKey - The key used for indexing the table.
 * @property {TTableData[]} data - The array of table data objects.
 * @property {TTableColumn[]} columns - The array of table columns.
 * @property {TTableIndexKey[]} [selected] - The array of selected index keys.
 * @property {(indexes: TTableIndexKey[]) => void} [onSelect] - Callback function for selecting table rows.
 */
export type TTable = {
  indexKey: string,
  data: TTableData[],
  columns: TTableColumn[],
  selected?: TTableIndexKey[],
  onSelect?: (indexes: TTableIndexKey[]) => void,
  beforeRow?: (item: TTableData) => React.ReactNode,
  afterRow?: (item: TTableData) => React.ReactNode,
  onRowClick?: (item: TTableData) => void,
  empty?: boolean
}