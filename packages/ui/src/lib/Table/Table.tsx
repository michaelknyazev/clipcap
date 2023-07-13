import { Checkbox } from '../Checkbox';
import styles from './Table.module.scss';

import type { 
  TTable, 
  TTableDataValue, 
  TTableRawCell, 
  TTableRawColumn, 
  TTableRawItem,
  TTableIndexKey, 
  TTableColumn,
  TTableData
} from './type';
  
/**
 * A Table component that displays data in a tabular format.
 *
 * @component
 * @param {Object} props - The props for the Table component.
 * @param {string} props.indexKey - The key used for indexing data items.
 * @param {TTableData[]} props.data - The data to be displayed in the table.
 * @param {TTableColumn[]} props.columns - The configuration for the table columns.
 * @param {TTableIndexKey[]} [props.selected] - The array of keys for the selected rows.
 * @param {(indexes: TTableIndexKey[]) => void} [props.onSelect] - The callback function to execute when rows are selected or deselected.
 * @returns {React.ReactElement} The rendered Table component.
 */
const Table = ({ 
  indexKey, 
  data, 
  columns,
  selected,
  onSelect,
  afterRow,
  beforeRow,
  onRowClick,
  empty
}: TTable) => {
  const mergedColumns: TTableRawColumn[] = columns.map(({ options, ...column }) => {
    const className = [
      styles['header__section']
    ];

    const { size = 'default' } = options;
    className.push(styles[`header__section-${size}`]);

    const _merged = {
      ...column,
      key: `header_${column.key}`,
      className: className.join(' ')
    };

    return _merged;
  });

  const enabledColumns = mergedColumns.map(_c => _c.dataIndex);
  const mergedData: TTableRawItem[] = data.map(({ ...item }) => {
    const className = [
      styles['data__section']
    ];
    
    const itemIndexKey = item[indexKey] as TTableIndexKey;
    const cells: TTableRawCell[] = enabledColumns
      .filter(dataKey => enabledColumns.indexOf(dataKey) >= 0)
      .map(columnKey => {
        const className = [
          styles['item__section']
        ];
        let data: TTableDataValue = item[columnKey];
        const column = columns.find(_c => _c.dataIndex === columnKey);
        
        if (column) {
          const { size = 20, render } = column.options;

          className.push(styles[`item__section-${size}`]);
          
          if (render) {
            data = render(data, item);
          }
        }

        return {
          key: `data_${column ? columnKey : ""}`,
          className: className.join(' '),
          content: data,
        }
      })

    if (onRowClick) className.push(styles['data__section-interactive']);
    
    const _merged: TTableRawItem = {
      key: itemIndexKey,
      className: className.join(' '),
      data: cells
    }

    if (beforeRow) _merged.before = beforeRow(item);
    if (afterRow) _merged.after = afterRow(item);
    if (onRowClick) _merged.onClick = () => onRowClick(item);
    
    return _merged;
  })

  const isAllRowsSelected = (() => {
    let result = false;

    if (onSelect && selected && selected.length) {
      const _allIndexes = mergedData.map(_d => _d.key);

      result = ((a, b) => {
        return a.length === b.length && a.every((element, index) => element === b[index])
      })(_allIndexes, selected);
    }

    return result;
  })()

  const handleSelect = (itemKey: string) => {
    if (!selected) return;

    let result = [ ...selected ];

    const _alreadySelected = result.find(_i => _i === itemKey);

    if (_alreadySelected) result.splice(result.indexOf(_alreadySelected), 1);
    else result.push(itemKey)

    if (onSelect) onSelect(result);
  }

  const handleSelectAll = () => {
    let result: string[] = [];

    if (!isAllRowsSelected) {
      result = mergedData.map(_i => _i.key);
    }

    if (onSelect) {
      onSelect(result)
    }
  }

  return (
    <div className={`${styles.container} ${styles[`container--${empty ? 'empty' : "default"}`]}`}>
      <div className={`${styles.section} ${styles['section-header']}`}>
        <div className={styles.header}>
          {onSelect ? (
            <div className={`${styles['header__section']}`}>
              <Checkbox disabled={empty} checked={isAllRowsSelected} onChange={handleSelectAll} />
            </div>
          ) : ""}
          {mergedColumns.map(column => {
            return (
              <div className={column.className} key={column.key}>
                <span className={styles.title}>
                  {column.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`${styles.section} ${styles['section-data']}`}>
        <div className={styles.data}>
          {mergedData.map(item => {
            const handleSelectItem = () => handleSelect(item.key);
            const handleClickRow = item.onClick ? item.onClick : () => {};
            const isSelected = selected && selected.length ? selected.indexOf(item.key) >= 0 : false;

            return (
              <div key={item.key} className={item.className}>
                {item.onClick ? <div className={styles['data__overlay']} onClick={item.onClick} /> : ""} 
                {item.before ? item.before : ""}
                <div className={styles.item}>
                  {onSelect ? (
                    <div className={`${styles['item__section']}`}>
                      <Checkbox 
                        checked={isSelected} 
                        onChange={handleSelectItem} 
                      />
                    </div>
                  ): ""}
                  {item.data.map(cell => {
                    return (
                      <div key={`${cell.key}`} className={cell.className}>
                        {cell.content}
                      </div>
                    );
                  })}
                </div>
                {item.after ? item.after : ""}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export { Table };