import { x as push, G as store_get, M as head, N as ensure_array_like, J as escape_html, F as attr, O as stringify, I as unsubscribe_stores, z as pop, P as attr_class, Q as attr_style, R as spread_props, S as element, q as is_array, T as get_prototype_of, U as object_prototype } from './index-CeukPVPf.js';
import { p as page, n as normalizeClientFilePath, b as buildTranscriptUrl } from './file-utils-D1ajqP8K.js';
import { w as writable, d as derived } from './index2-uppKP1uk.js';
import { S as SCORE_THRESHOLDS } from './constants-C6XQO3qi.js';
import { a as collectScoreDescriptions, b as extractFirstSentence } from './transcript-utils-BY7i01oF.js';
import { compileExpression } from 'filtrex';
import './client-DCZcF6HN.js';
import '@sveltejs/kit/internal';
import './exports-Cv9LZeD1.js';

function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function makeStateUpdater(key, instance) {
  return (updater) => {
    instance.setState((old) => {
      return {
        ...old,
        [key]: functionalUpdate(updater, old[key])
      };
    });
  };
}
function isFunction(d) {
  return d instanceof Function;
}
function isNumberArray(d) {
  return Array.isArray(d) && d.every((val) => typeof val === "number");
}
function flattenBy(arr, getChildren) {
  const flat = [];
  const recurse = (subArr) => {
    subArr.forEach((item) => {
      flat.push(item);
      const children = getChildren(item);
      if (children == null ? void 0 : children.length) {
        recurse(children);
      }
    });
  };
  recurse(arr);
  return flat;
}
function memo$1(getDeps, fn, opts) {
  let deps = [];
  let result;
  return (depArgs) => {
    var _a;
    let depTime;
    if (opts.key && opts.debug) depTime = Date.now();
    const newDeps = getDeps(depArgs);
    const depsChanged = newDeps.length !== deps.length || newDeps.some((dep, index) => deps[index] !== dep);
    if (!depsChanged) {
      return result;
    }
    deps = newDeps;
    let resultTime;
    if (opts.key && opts.debug) resultTime = Date.now();
    result = fn(...newDeps);
    (_a = opts == null ? void 0 : opts.onChange) == null ? void 0 : _a.call(opts, result);
    if (opts.key && opts.debug) {
      if (opts == null ? void 0 : opts.debug()) {
        const depEndTime = Math.round((Date.now() - depTime) * 100) / 100;
        const resultEndTime = Math.round((Date.now() - resultTime) * 100) / 100;
        const resultFpsPercentage = resultEndTime / 16;
        const pad = (str, num) => {
          str = String(str);
          while (str.length < num) {
            str = " " + str;
          }
          return str;
        };
        console.info(
          `%c⏱ ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`,
          `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
            0,
            Math.min(120 - 120 * resultFpsPercentage, 120)
          )}deg 100% 31%);`,
          opts == null ? void 0 : opts.key
        );
      }
    }
    return result;
  };
}
function getMemoOptions(tableOptions, debugLevel, key, onChange) {
  return {
    debug: () => (tableOptions == null ? void 0 : tableOptions.debugAll) ?? tableOptions[debugLevel],
    key: process.env.NODE_ENV === "development" && key,
    onChange
  };
}

function _createCell(table, row, column, columnId) {
  const getRenderValue = () => cell.getValue() ?? table.options.renderFallbackValue;
  const cell = {
    id: `${row.id}_${column.id}`,
    row,
    column,
    getValue: () => row.getValue(columnId),
    renderValue: getRenderValue,
    getContext: memo$1(
      () => [table, column, row, cell],
      (table2, column2, row2, cell2) => ({
        table: table2,
        column: column2,
        row: row2,
        cell: cell2,
        getValue: cell2.getValue,
        renderValue: cell2.renderValue
      }),
      getMemoOptions(table.options, "debugCells", "cell.getContext")
    )
  };
  table._features.forEach((feature) => {
    var _a;
    (_a = feature._createCell) == null ? void 0 : _a.call(
      feature,
      cell,
      column,
      row,
      table
    );
  }, {});
  return cell;
}

function _createColumn(table, columnDef, depth, parent) {
  var _a;
  const defaultColumn = table._getDefaultColumnDef();
  const resolvedColumnDef = {
    ...defaultColumn,
    ...columnDef
  };
  const accessorKey = resolvedColumnDef.accessorKey;
  let id = resolvedColumnDef.id ?? (accessorKey ? accessorKey.replace(".", "_") : void 0) ?? (typeof resolvedColumnDef.header === "string" ? resolvedColumnDef.header : void 0);
  let accessorFn;
  if (resolvedColumnDef.accessorFn) {
    accessorFn = resolvedColumnDef.accessorFn;
  } else if (accessorKey) {
    if (accessorKey.includes(".")) {
      accessorFn = (originalRow) => {
        let result = originalRow;
        for (const key of accessorKey.split(".")) {
          result = result == null ? void 0 : result[key];
          if (process.env.NODE_ENV !== "production" && result === void 0) {
            console.warn(
              `"${key}" in deeply nested key "${accessorKey}" returned undefined.`
            );
          }
        }
        return result;
      };
    } else {
      accessorFn = (originalRow) => originalRow[resolvedColumnDef.accessorKey];
    }
  }
  if (!id) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        resolvedColumnDef.accessorFn ? `Columns require an id when using an accessorFn` : `Columns require an id when using a non-string header`
      );
    }
    throw new Error();
  }
  let column = {
    id: `${String(id)}`,
    accessorFn,
    parent,
    depth,
    columnDef: resolvedColumnDef,
    columns: [],
    getFlatColumns: memo$1(
      () => [true],
      () => {
        var _a2;
        return [
          column,
          ...(_a2 = column.columns) == null ? void 0 : _a2.flatMap((d) => d.getFlatColumns())
        ];
      },
      getMemoOptions(table.options, "debugColumns", "column.getFlatColumns")
    ),
    getLeafColumns: memo$1(
      () => [table._getOrderColumnsFn()],
      (orderColumns) => {
        var _a2;
        if ((_a2 = column.columns) == null ? void 0 : _a2.length) {
          let leafColumns = column.columns.flatMap(
            (column2) => column2.getLeafColumns()
          );
          return orderColumns(leafColumns);
        }
        return [column];
      },
      getMemoOptions(table.options, "debugColumns", "column.getLeafColumns")
    )
  };
  for (const feature of table._features) {
    (_a = feature._createColumn) == null ? void 0 : _a.call(feature, column, table);
  }
  return column;
}

const debug = "debugHeaders";
function _createHeader(table, column, options) {
  const id = options.id ?? column.id;
  let header = {
    id,
    column,
    index: options.index,
    isPlaceholder: !!options.isPlaceholder,
    placeholderId: options.placeholderId,
    depth: options.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const leafHeaders = [];
      const recurseHeader = (h) => {
        if (h.subHeaders && h.subHeaders.length) {
          h.subHeaders.map(recurseHeader);
        }
        leafHeaders.push(h);
      };
      recurseHeader(header);
      return leafHeaders;
    },
    getContext: () => ({
      table,
      header,
      column
    })
  };
  table._features.forEach((feature) => {
    var _a;
    (_a = feature._createHeader) == null ? void 0 : _a.call(feature, header, table);
  });
  return header;
}
const Headers = {
  _createTable: (table) => {
    table.getHeaderGroups = memo$1(
      () => [
        table.getAllColumns(),
        table.getVisibleLeafColumns(),
        table.getState().columnPinning.left,
        table.getState().columnPinning.right
      ],
      (allColumns, leafColumns, left, right) => {
        const leftColumns = (left == null ? void 0 : left.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) ?? [];
        const rightColumns = (right == null ? void 0 : right.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) ?? [];
        const centerColumns = leafColumns.filter(
          (column) => !(left == null ? void 0 : left.includes(column.id)) && !(right == null ? void 0 : right.includes(column.id))
        );
        const headerGroups = buildHeaderGroups(
          allColumns,
          [...leftColumns, ...centerColumns, ...rightColumns],
          table
        );
        return headerGroups;
      },
      getMemoOptions(table.options, debug, "getHeaderGroups")
    );
    table.getCenterHeaderGroups = memo$1(
      () => [
        table.getAllColumns(),
        table.getVisibleLeafColumns(),
        table.getState().columnPinning.left,
        table.getState().columnPinning.right
      ],
      (allColumns, leafColumns, left, right) => {
        leafColumns = leafColumns.filter(
          (column) => !(left == null ? void 0 : left.includes(column.id)) && !(right == null ? void 0 : right.includes(column.id))
        );
        return buildHeaderGroups(allColumns, leafColumns, table, "center");
      },
      getMemoOptions(table.options, debug, "getCenterHeaderGroups")
    );
    table.getLeftHeaderGroups = memo$1(
      () => [
        table.getAllColumns(),
        table.getVisibleLeafColumns(),
        table.getState().columnPinning.left
      ],
      (allColumns, leafColumns, left) => {
        const orderedLeafColumns = (left == null ? void 0 : left.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) ?? [];
        return buildHeaderGroups(allColumns, orderedLeafColumns, table, "left");
      },
      getMemoOptions(table.options, debug, "getLeftHeaderGroups")
    );
    table.getRightHeaderGroups = memo$1(
      () => [
        table.getAllColumns(),
        table.getVisibleLeafColumns(),
        table.getState().columnPinning.right
      ],
      (allColumns, leafColumns, right) => {
        const orderedLeafColumns = (right == null ? void 0 : right.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) ?? [];
        return buildHeaderGroups(allColumns, orderedLeafColumns, table, "right");
      },
      getMemoOptions(table.options, debug, "getRightHeaderGroups")
    );
    table.getFooterGroups = memo$1(
      () => [table.getHeaderGroups()],
      (headerGroups) => {
        return [...headerGroups].reverse();
      },
      getMemoOptions(table.options, debug, "getFooterGroups")
    );
    table.getLeftFooterGroups = memo$1(
      () => [table.getLeftHeaderGroups()],
      (headerGroups) => {
        return [...headerGroups].reverse();
      },
      getMemoOptions(table.options, debug, "getLeftFooterGroups")
    );
    table.getCenterFooterGroups = memo$1(
      () => [table.getCenterHeaderGroups()],
      (headerGroups) => {
        return [...headerGroups].reverse();
      },
      getMemoOptions(table.options, debug, "getCenterFooterGroups")
    );
    table.getRightFooterGroups = memo$1(
      () => [table.getRightHeaderGroups()],
      (headerGroups) => {
        return [...headerGroups].reverse();
      },
      getMemoOptions(table.options, debug, "getRightFooterGroups")
    );
    table.getFlatHeaders = memo$1(
      () => [table.getHeaderGroups()],
      (headerGroups) => {
        return headerGroups.map((headerGroup) => {
          return headerGroup.headers;
        }).flat();
      },
      getMemoOptions(table.options, debug, "getFlatHeaders")
    );
    table.getLeftFlatHeaders = memo$1(
      () => [table.getLeftHeaderGroups()],
      (left) => {
        return left.map((headerGroup) => {
          return headerGroup.headers;
        }).flat();
      },
      getMemoOptions(table.options, debug, "getLeftFlatHeaders")
    );
    table.getCenterFlatHeaders = memo$1(
      () => [table.getCenterHeaderGroups()],
      (left) => {
        return left.map((headerGroup) => {
          return headerGroup.headers;
        }).flat();
      },
      getMemoOptions(table.options, debug, "getCenterFlatHeaders")
    );
    table.getRightFlatHeaders = memo$1(
      () => [table.getRightHeaderGroups()],
      (left) => {
        return left.map((headerGroup) => {
          return headerGroup.headers;
        }).flat();
      },
      getMemoOptions(table.options, debug, "getRightFlatHeaders")
    );
    table.getCenterLeafHeaders = memo$1(
      () => [table.getCenterFlatHeaders()],
      (flatHeaders) => {
        return flatHeaders.filter((header) => {
          var _a;
          return !((_a = header.subHeaders) == null ? void 0 : _a.length);
        });
      },
      getMemoOptions(table.options, debug, "getCenterLeafHeaders")
    );
    table.getLeftLeafHeaders = memo$1(
      () => [table.getLeftFlatHeaders()],
      (flatHeaders) => {
        return flatHeaders.filter((header) => {
          var _a;
          return !((_a = header.subHeaders) == null ? void 0 : _a.length);
        });
      },
      getMemoOptions(table.options, debug, "getLeftLeafHeaders")
    );
    table.getRightLeafHeaders = memo$1(
      () => [table.getRightFlatHeaders()],
      (flatHeaders) => {
        return flatHeaders.filter((header) => {
          var _a;
          return !((_a = header.subHeaders) == null ? void 0 : _a.length);
        });
      },
      getMemoOptions(table.options, debug, "getRightLeafHeaders")
    );
    table.getLeafHeaders = memo$1(
      () => [
        table.getLeftHeaderGroups(),
        table.getCenterHeaderGroups(),
        table.getRightHeaderGroups()
      ],
      (left, center, right) => {
        var _a, _b, _c;
        return [
          ...((_a = left[0]) == null ? void 0 : _a.headers) ?? [],
          ...((_b = center[0]) == null ? void 0 : _b.headers) ?? [],
          ...((_c = right[0]) == null ? void 0 : _c.headers) ?? []
        ].map((header) => {
          return header.getLeafHeaders();
        }).flat();
      },
      getMemoOptions(table.options, debug, "getLeafHeaders")
    );
  }
};
function buildHeaderGroups(allColumns, columnsToGroup, table, headerFamily) {
  var _a;
  let maxDepth = 0;
  const findMaxDepth = (columns, depth = 1) => {
    maxDepth = Math.max(maxDepth, depth);
    columns.filter((column) => column.getIsVisible()).forEach((column) => {
      var _a2;
      if ((_a2 = column.columns) == null ? void 0 : _a2.length) {
        findMaxDepth(column.columns, depth + 1);
      }
    }, 0);
  };
  findMaxDepth(allColumns);
  let headerGroups = [];
  const createHeaderGroup = (headersToGroup, depth) => {
    const headerGroup = {
      depth,
      id: [headerFamily, `${depth}`].filter(Boolean).join("_"),
      headers: []
    };
    const pendingParentHeaders = [];
    headersToGroup.forEach((headerToGroup) => {
      const latestPendingParentHeader = [...pendingParentHeaders].reverse()[0];
      const isLeafHeader = headerToGroup.column.depth === headerGroup.depth;
      let column;
      let isPlaceholder = false;
      if (isLeafHeader && headerToGroup.column.parent) {
        column = headerToGroup.column.parent;
      } else {
        column = headerToGroup.column;
        isPlaceholder = true;
      }
      if (latestPendingParentHeader && (latestPendingParentHeader == null ? void 0 : latestPendingParentHeader.column) === column) {
        latestPendingParentHeader.subHeaders.push(headerToGroup);
      } else {
        const header = _createHeader(table, column, {
          id: [headerFamily, depth, column.id, headerToGroup == null ? void 0 : headerToGroup.id].filter(Boolean).join("_"),
          isPlaceholder,
          placeholderId: isPlaceholder ? `${pendingParentHeaders.filter((d) => d.column === column).length}` : void 0,
          depth,
          index: pendingParentHeaders.length
        });
        header.subHeaders.push(headerToGroup);
        pendingParentHeaders.push(header);
      }
      headerGroup.headers.push(headerToGroup);
      headerToGroup.headerGroup = headerGroup;
    });
    headerGroups.push(headerGroup);
    if (depth > 0) {
      createHeaderGroup(pendingParentHeaders, depth - 1);
    }
  };
  const bottomHeaders = columnsToGroup.map(
    (column, index) => _createHeader(table, column, {
      depth: maxDepth,
      index
    })
  );
  createHeaderGroup(bottomHeaders, maxDepth - 1);
  headerGroups.reverse();
  const recurseHeadersForSpans = (headers) => {
    const filteredHeaders = headers.filter(
      (header) => header.column.getIsVisible()
    );
    return filteredHeaders.map((header) => {
      let colSpan = 0;
      let rowSpan = 0;
      let childRowSpans = [0];
      if (header.subHeaders && header.subHeaders.length) {
        childRowSpans = [];
        recurseHeadersForSpans(header.subHeaders).forEach(
          ({ colSpan: childColSpan, rowSpan: childRowSpan }) => {
            colSpan += childColSpan;
            childRowSpans.push(childRowSpan);
          }
        );
      } else {
        colSpan = 1;
      }
      const minChildRowSpan = Math.min(...childRowSpans);
      rowSpan = rowSpan + minChildRowSpan;
      header.colSpan = colSpan;
      header.rowSpan = rowSpan;
      return { colSpan, rowSpan };
    });
  };
  recurseHeadersForSpans(((_a = headerGroups[0]) == null ? void 0 : _a.headers) ?? []);
  return headerGroups;
}

const _createRow = (table, id, original, rowIndex, depth, subRows, parentId) => {
  var _a;
  let row = {
    id,
    index: rowIndex,
    original,
    depth,
    parentId,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (columnId) => {
      if (row._valuesCache.hasOwnProperty(columnId)) {
        return row._valuesCache[columnId];
      }
      const column = table.getColumn(columnId);
      if (!(column == null ? void 0 : column.accessorFn)) {
        return void 0;
      }
      row._valuesCache[columnId] = column.accessorFn(
        row.original,
        rowIndex
      );
      return row._valuesCache[columnId];
    },
    getUniqueValues: (columnId) => {
      if (row._uniqueValuesCache.hasOwnProperty(columnId)) {
        return row._uniqueValuesCache[columnId];
      }
      const column = table.getColumn(columnId);
      if (!(column == null ? void 0 : column.accessorFn)) {
        return void 0;
      }
      if (!column.columnDef.getUniqueValues) {
        row._uniqueValuesCache[columnId] = [row.getValue(columnId)];
        return row._uniqueValuesCache[columnId];
      }
      row._uniqueValuesCache[columnId] = column.columnDef.getUniqueValues(
        row.original,
        rowIndex
      );
      return row._uniqueValuesCache[columnId];
    },
    renderValue: (columnId) => row.getValue(columnId) ?? table.options.renderFallbackValue,
    subRows: [],
    getLeafRows: () => flattenBy(row.subRows, (d) => d.subRows),
    getParentRow: () => row.parentId ? table.getRow(row.parentId, true) : void 0,
    getParentRows: () => {
      let parentRows = [];
      let currentRow = row;
      while (true) {
        const parentRow = currentRow.getParentRow();
        if (!parentRow) break;
        parentRows.push(parentRow);
        currentRow = parentRow;
      }
      return parentRows.reverse();
    },
    getAllCells: memo$1(
      () => [table.getAllLeafColumns()],
      (leafColumns) => {
        return leafColumns.map((column) => {
          return _createCell(table, row, column, column.id);
        });
      },
      getMemoOptions(table.options, "debugRows", "getAllCells")
    ),
    _getAllCellsByColumnId: memo$1(
      () => [row.getAllCells()],
      (allCells) => {
        return allCells.reduce(
          (acc, cell) => {
            acc[cell.column.id] = cell;
            return acc;
          },
          {}
        );
      },
      getMemoOptions(table.options, "debugRows", "getAllCellsByColumnId")
    )
  };
  for (let i = 0; i < table._features.length; i++) {
    const feature = table._features[i];
    (_a = feature == null ? void 0 : feature._createRow) == null ? void 0 : _a.call(feature, row, table);
  }
  return row;
};

const ColumnFaceting = {
  _createColumn: (column, table) => {
    column._getFacetedRowModel = table.options.getFacetedRowModel && table.options.getFacetedRowModel(table, column.id);
    column.getFacetedRowModel = () => {
      if (!column._getFacetedRowModel) {
        return table.getPreFilteredRowModel();
      }
      return column._getFacetedRowModel();
    };
    column._getFacetedUniqueValues = table.options.getFacetedUniqueValues && table.options.getFacetedUniqueValues(table, column.id);
    column.getFacetedUniqueValues = () => {
      if (!column._getFacetedUniqueValues) {
        return /* @__PURE__ */ new Map();
      }
      return column._getFacetedUniqueValues();
    };
    column._getFacetedMinMaxValues = table.options.getFacetedMinMaxValues && table.options.getFacetedMinMaxValues(table, column.id);
    column.getFacetedMinMaxValues = () => {
      if (!column._getFacetedMinMaxValues) {
        return void 0;
      }
      return column._getFacetedMinMaxValues();
    };
  }
};

const includesString = (row, columnId, filterValue) => {
  var _a, _b, _c;
  const search = filterValue.toLowerCase();
  return Boolean(
    (_c = (_b = (_a = row.getValue(columnId)) == null ? void 0 : _a.toString()) == null ? void 0 : _b.toLowerCase()) == null ? void 0 : _c.includes(search)
  );
};
includesString.autoRemove = (val) => testFalsey(val);
const includesStringSensitive = (row, columnId, filterValue) => {
  var _a, _b;
  return Boolean(
    (_b = (_a = row.getValue(columnId)) == null ? void 0 : _a.toString()) == null ? void 0 : _b.includes(filterValue)
  );
};
includesStringSensitive.autoRemove = (val) => testFalsey(val);
const equalsString = (row, columnId, filterValue) => {
  var _a, _b;
  return ((_b = (_a = row.getValue(columnId)) == null ? void 0 : _a.toString()) == null ? void 0 : _b.toLowerCase()) === (filterValue == null ? void 0 : filterValue.toLowerCase());
};
equalsString.autoRemove = (val) => testFalsey(val);
const arrIncludes = (row, columnId, filterValue) => {
  var _a;
  return (_a = row.getValue(columnId)) == null ? void 0 : _a.includes(filterValue);
};
arrIncludes.autoRemove = (val) => testFalsey(val) || !(val == null ? void 0 : val.length);
const arrIncludesAll = (row, columnId, filterValue) => {
  return !filterValue.some(
    (val) => {
      var _a;
      return !((_a = row.getValue(columnId)) == null ? void 0 : _a.includes(val));
    }
  );
};
arrIncludesAll.autoRemove = (val) => testFalsey(val) || !(val == null ? void 0 : val.length);
const arrIncludesSome = (row, columnId, filterValue) => {
  return filterValue.some(
    (val) => {
      var _a;
      return (_a = row.getValue(columnId)) == null ? void 0 : _a.includes(val);
    }
  );
};
arrIncludesSome.autoRemove = (val) => testFalsey(val) || !(val == null ? void 0 : val.length);
const equals = (row, columnId, filterValue) => {
  return row.getValue(columnId) === filterValue;
};
equals.autoRemove = (val) => testFalsey(val);
const weakEquals = (row, columnId, filterValue) => {
  return row.getValue(columnId) == filterValue;
};
weakEquals.autoRemove = (val) => testFalsey(val);
const inNumberRange = (row, columnId, filterValue) => {
  let [min, max] = filterValue;
  const rowValue = row.getValue(columnId);
  return rowValue >= min && rowValue <= max;
};
inNumberRange.resolveFilterValue = (val) => {
  let [unsafeMin, unsafeMax] = val;
  let parsedMin = typeof unsafeMin !== "number" ? parseFloat(unsafeMin) : unsafeMin;
  let parsedMax = typeof unsafeMax !== "number" ? parseFloat(unsafeMax) : unsafeMax;
  let min = unsafeMin === null || Number.isNaN(parsedMin) ? -Infinity : parsedMin;
  let max = unsafeMax === null || Number.isNaN(parsedMax) ? Infinity : parsedMax;
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }
  return [min, max];
};
inNumberRange.autoRemove = (val) => testFalsey(val) || testFalsey(val[0]) && testFalsey(val[1]);
const filterFns = {
  includesString,
  includesStringSensitive,
  equalsString,
  arrIncludes,
  arrIncludesAll,
  arrIncludesSome,
  equals,
  weakEquals,
  inNumberRange
};
function testFalsey(val) {
  return val === void 0 || val === null || val === "";
}

const ColumnFiltering = {
  _getDefaultColumnDef: () => {
    return {
      filterFn: "auto"
    };
  },
  _getInitialState: (state) => {
    return {
      columnFilters: [],
      ...state
    };
  },
  _getDefaultOptions: (table) => {
    return {
      onColumnFiltersChange: makeStateUpdater("columnFilters", table),
      filterFromLeafRows: false,
      maxLeafRowFilterDepth: 100
    };
  },
  _createColumn: (column, table) => {
    column.getAutoFilterFn = () => {
      const firstRow = table.getCoreRowModel().flatRows[0];
      const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
      if (typeof value === "string") {
        return filterFns.includesString;
      }
      if (typeof value === "number") {
        return filterFns.inNumberRange;
      }
      if (typeof value === "boolean") {
        return filterFns.equals;
      }
      if (value !== null && typeof value === "object") {
        return filterFns.equals;
      }
      if (Array.isArray(value)) {
        return filterFns.arrIncludes;
      }
      return filterFns.weakEquals;
    };
    column.getFilterFn = () => {
      var _a;
      return isFunction(column.columnDef.filterFn) ? column.columnDef.filterFn : column.columnDef.filterFn === "auto" ? column.getAutoFilterFn() : (
        // @ts-ignore
        ((_a = table.options.filterFns) == null ? void 0 : _a[column.columnDef.filterFn]) ?? filterFns[column.columnDef.filterFn]
      );
    };
    column.getCanFilter = () => {
      return (column.columnDef.enableColumnFilter ?? true) && (table.options.enableColumnFilters ?? true) && (table.options.enableFilters ?? true) && !!column.accessorFn;
    };
    column.getIsFiltered = () => column.getFilterIndex() > -1;
    column.getFilterValue = () => {
      var _a, _b;
      return (_b = (_a = table.getState().columnFilters) == null ? void 0 : _a.find((d) => d.id === column.id)) == null ? void 0 : _b.value;
    };
    column.getFilterIndex = () => {
      var _a;
      return ((_a = table.getState().columnFilters) == null ? void 0 : _a.findIndex((d) => d.id === column.id)) ?? -1;
    };
    column.setFilterValue = (value) => {
      table.setColumnFilters((old) => {
        const filterFn = column.getFilterFn();
        const previousFilter = old == null ? void 0 : old.find((d) => d.id === column.id);
        const newFilter = functionalUpdate(
          value,
          previousFilter ? previousFilter.value : void 0
        );
        if (shouldAutoRemoveFilter(filterFn, newFilter, column)) {
          return (old == null ? void 0 : old.filter((d) => d.id !== column.id)) ?? [];
        }
        const newFilterObj = { id: column.id, value: newFilter };
        if (previousFilter) {
          return (old == null ? void 0 : old.map((d) => {
            if (d.id === column.id) {
              return newFilterObj;
            }
            return d;
          })) ?? [];
        }
        if (old == null ? void 0 : old.length) {
          return [...old, newFilterObj];
        }
        return [newFilterObj];
      });
    };
  },
  _createRow: (row, _table) => {
    row.columnFilters = {};
    row.columnFiltersMeta = {};
  },
  _createTable: (table) => {
    table.setColumnFilters = (updater) => {
      var _a, _b;
      const leafColumns = table.getAllLeafColumns();
      const updateFn = (old) => {
        var _a2;
        return (_a2 = functionalUpdate(updater, old)) == null ? void 0 : _a2.filter((filter) => {
          const column = leafColumns.find((d) => d.id === filter.id);
          if (column) {
            const filterFn = column.getFilterFn();
            if (shouldAutoRemoveFilter(filterFn, filter.value, column)) {
              return false;
            }
          }
          return true;
        });
      };
      (_b = (_a = table.options).onColumnFiltersChange) == null ? void 0 : _b.call(_a, updateFn);
    };
    table.resetColumnFilters = (defaultState) => {
      var _a;
      table.setColumnFilters(
        defaultState ? [] : ((_a = table.initialState) == null ? void 0 : _a.columnFilters) ?? []
      );
    };
    table.getPreFilteredRowModel = () => table.getCoreRowModel();
    table.getFilteredRowModel = () => {
      if (!table._getFilteredRowModel && table.options.getFilteredRowModel) {
        table._getFilteredRowModel = table.options.getFilteredRowModel(table);
      }
      if (table.options.manualFiltering || !table._getFilteredRowModel) {
        return table.getPreFilteredRowModel();
      }
      return table._getFilteredRowModel();
    };
  }
};
function shouldAutoRemoveFilter(filterFn, value, column) {
  return (filterFn && filterFn.autoRemove ? filterFn.autoRemove(value, column) : false) || typeof value === "undefined" || typeof value === "string" && !value;
}

const sum = (columnId, _leafRows, childRows) => {
  return childRows.reduce((sum2, next) => {
    const nextValue = next.getValue(columnId);
    return sum2 + (typeof nextValue === "number" ? nextValue : 0);
  }, 0);
};
const min = (columnId, _leafRows, childRows) => {
  let min2;
  childRows.forEach((row) => {
    const value = row.getValue(columnId);
    if (value != null && (min2 > value || min2 === void 0 && value >= value)) {
      min2 = value;
    }
  });
  return min2;
};
const max = (columnId, _leafRows, childRows) => {
  let max2;
  childRows.forEach((row) => {
    const value = row.getValue(columnId);
    if (value != null && (max2 < value || max2 === void 0 && value >= value)) {
      max2 = value;
    }
  });
  return max2;
};
const extent = (columnId, _leafRows, childRows) => {
  let min2;
  let max2;
  childRows.forEach((row) => {
    const value = row.getValue(columnId);
    if (value != null) {
      if (min2 === void 0) {
        if (value >= value) min2 = max2 = value;
      } else {
        if (min2 > value) min2 = value;
        if (max2 < value) max2 = value;
      }
    }
  });
  return [min2, max2];
};
const mean = (columnId, leafRows) => {
  let count2 = 0;
  let sum2 = 0;
  leafRows.forEach((row) => {
    let value = row.getValue(columnId);
    if (value != null && (value = +value) >= value) {
      ++count2, sum2 += value;
    }
  });
  if (count2) return sum2 / count2;
  return;
};
const median = (columnId, leafRows) => {
  if (!leafRows.length) {
    return;
  }
  const values = leafRows.map((row) => row.getValue(columnId));
  if (!isNumberArray(values)) {
    return;
  }
  if (values.length === 1) {
    return values[0];
  }
  const mid = Math.floor(values.length / 2);
  const nums = values.sort((a, b) => a - b);
  return values.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
const unique = (columnId, leafRows) => {
  return Array.from(new Set(leafRows.map((d) => d.getValue(columnId))).values());
};
const uniqueCount = (columnId, leafRows) => {
  return new Set(leafRows.map((d) => d.getValue(columnId))).size;
};
const count = (_columnId, leafRows) => {
  return leafRows.length;
};
const aggregationFns = {
  sum,
  min,
  max,
  extent,
  mean,
  median,
  unique,
  uniqueCount,
  count
};

const ColumnGrouping = {
  _getDefaultColumnDef: () => {
    return {
      aggregatedCell: (props) => {
        var _a, _b;
        return ((_b = (_a = props.getValue()) == null ? void 0 : _a.toString) == null ? void 0 : _b.call(_a)) ?? null;
      },
      aggregationFn: "auto"
    };
  },
  _getInitialState: (state) => {
    return {
      grouping: [],
      ...state
    };
  },
  _getDefaultOptions: (table) => {
    return {
      onGroupingChange: makeStateUpdater("grouping", table),
      groupedColumnMode: "reorder"
    };
  },
  _createColumn: (column, table) => {
    column.toggleGrouping = () => {
      table.setGrouping((old) => {
        if (old == null ? void 0 : old.includes(column.id)) {
          return old.filter((d) => d !== column.id);
        }
        return [...old ?? [], column.id];
      });
    };
    column.getCanGroup = () => {
      return (column.columnDef.enableGrouping ?? true) && (table.options.enableGrouping ?? true) && (!!column.accessorFn || !!column.columnDef.getGroupingValue);
    };
    column.getIsGrouped = () => {
      var _a;
      return (_a = table.getState().grouping) == null ? void 0 : _a.includes(column.id);
    };
    column.getGroupedIndex = () => {
      var _a;
      return (_a = table.getState().grouping) == null ? void 0 : _a.indexOf(column.id);
    };
    column.getToggleGroupingHandler = () => {
      const canGroup = column.getCanGroup();
      return () => {
        if (!canGroup) return;
        column.toggleGrouping();
      };
    };
    column.getAutoAggregationFn = () => {
      const firstRow = table.getCoreRowModel().flatRows[0];
      const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
      if (typeof value === "number") {
        return aggregationFns.sum;
      }
      if (Object.prototype.toString.call(value) === "[object Date]") {
        return aggregationFns.extent;
      }
    };
    column.getAggregationFn = () => {
      var _a;
      if (!column) {
        throw new Error();
      }
      return isFunction(column.columnDef.aggregationFn) ? column.columnDef.aggregationFn : column.columnDef.aggregationFn === "auto" ? column.getAutoAggregationFn() : ((_a = table.options.aggregationFns) == null ? void 0 : _a[column.columnDef.aggregationFn]) ?? aggregationFns[column.columnDef.aggregationFn];
    };
  },
  _createTable: (table) => {
    table.setGrouping = (updater) => {
      var _a, _b;
      return (_b = (_a = table.options).onGroupingChange) == null ? void 0 : _b.call(_a, updater);
    };
    table.resetGrouping = (defaultState) => {
      var _a;
      table.setGrouping(defaultState ? [] : ((_a = table.initialState) == null ? void 0 : _a.grouping) ?? []);
    };
    table.getPreGroupedRowModel = () => table.getFilteredRowModel();
    table.getGroupedRowModel = () => {
      if (!table._getGroupedRowModel && table.options.getGroupedRowModel) {
        table._getGroupedRowModel = table.options.getGroupedRowModel(table);
      }
      if (table.options.manualGrouping || !table._getGroupedRowModel) {
        return table.getPreGroupedRowModel();
      }
      return table._getGroupedRowModel();
    };
  },
  _createRow: (row, table) => {
    row.getIsGrouped = () => !!row.groupingColumnId;
    row.getGroupingValue = (columnId) => {
      if (row._groupingValuesCache.hasOwnProperty(columnId)) {
        return row._groupingValuesCache[columnId];
      }
      const column = table.getColumn(columnId);
      if (!(column == null ? void 0 : column.columnDef.getGroupingValue)) {
        return row.getValue(columnId);
      }
      row._groupingValuesCache[columnId] = column.columnDef.getGroupingValue(
        row.original
      );
      return row._groupingValuesCache[columnId];
    };
    row._groupingValuesCache = {};
  },
  _createCell: (cell, column, row, table) => {
    cell.getIsGrouped = () => column.getIsGrouped() && column.id === row.groupingColumnId;
    cell.getIsPlaceholder = () => !cell.getIsGrouped() && column.getIsGrouped();
    cell.getIsAggregated = () => {
      var _a;
      return !cell.getIsGrouped() && !cell.getIsPlaceholder() && !!((_a = row.subRows) == null ? void 0 : _a.length);
    };
  }
};
function orderColumns(leafColumns, grouping, groupedColumnMode) {
  if (!(grouping == null ? void 0 : grouping.length) || !groupedColumnMode) {
    return leafColumns;
  }
  const nonGroupingColumns = leafColumns.filter(
    (col) => !grouping.includes(col.id)
  );
  if (groupedColumnMode === "remove") {
    return nonGroupingColumns;
  }
  const groupingColumns = grouping.map((g) => leafColumns.find((col) => col.id === g)).filter(Boolean);
  return [...groupingColumns, ...nonGroupingColumns];
}

const ColumnVisibility = {
  _getInitialState: (state) => {
    return {
      columnVisibility: {},
      ...state
    };
  },
  _getDefaultOptions: (table) => {
    return {
      onColumnVisibilityChange: makeStateUpdater("columnVisibility", table)
    };
  },
  _createColumn: (column, table) => {
    column.toggleVisibility = (value) => {
      if (column.getCanHide()) {
        table.setColumnVisibility((old) => ({
          ...old,
          [column.id]: value ?? !column.getIsVisible()
        }));
      }
    };
    column.getIsVisible = () => {
      var _a;
      const childColumns = column.columns;
      return (childColumns.length ? childColumns.some((c) => c.getIsVisible()) : (_a = table.getState().columnVisibility) == null ? void 0 : _a[column.id]) ?? true;
    };
    column.getCanHide = () => {
      return (column.columnDef.enableHiding ?? true) && (table.options.enableHiding ?? true);
    };
    column.getToggleVisibilityHandler = () => {
      return (e) => {
        var _a;
        (_a = column.toggleVisibility) == null ? void 0 : _a.call(
          column,
          e.target.checked
        );
      };
    };
  },
  _createRow: (row, table) => {
    row._getAllVisibleCells = memo$1(
      () => [row.getAllCells(), table.getState().columnVisibility],
      (cells) => {
        return cells.filter((cell) => cell.column.getIsVisible());
      },
      getMemoOptions(table.options, "debugRows", "_getAllVisibleCells")
    );
    row.getVisibleCells = memo$1(
      () => [
        row.getLeftVisibleCells(),
        row.getCenterVisibleCells(),
        row.getRightVisibleCells()
      ],
      (left, center, right) => [...left, ...center, ...right],
      getMemoOptions(table.options, "debugRows", "getVisibleCells")
    );
  },
  _createTable: (table) => {
    const makeVisibleColumnsMethod = (key, getColumns) => {
      return memo$1(
        () => [
          getColumns(),
          getColumns().filter((d) => d.getIsVisible()).map((d) => d.id).join("_")
        ],
        (columns) => {
          return columns.filter((d) => {
            var _a;
            return (_a = d.getIsVisible) == null ? void 0 : _a.call(d);
          });
        },
        getMemoOptions(table.options, "debugColumns", key)
      );
    };
    table.getVisibleFlatColumns = makeVisibleColumnsMethod(
      "getVisibleFlatColumns",
      () => table.getAllFlatColumns()
    );
    table.getVisibleLeafColumns = makeVisibleColumnsMethod(
      "getVisibleLeafColumns",
      () => table.getAllLeafColumns()
    );
    table.getLeftVisibleLeafColumns = makeVisibleColumnsMethod(
      "getLeftVisibleLeafColumns",
      () => table.getLeftLeafColumns()
    );
    table.getRightVisibleLeafColumns = makeVisibleColumnsMethod(
      "getRightVisibleLeafColumns",
      () => table.getRightLeafColumns()
    );
    table.getCenterVisibleLeafColumns = makeVisibleColumnsMethod(
      "getCenterVisibleLeafColumns",
      () => table.getCenterLeafColumns()
    );
    table.setColumnVisibility = (updater) => {
      var _a, _b;
      return (_b = (_a = table.options).onColumnVisibilityChange) == null ? void 0 : _b.call(_a, updater);
    };
    table.resetColumnVisibility = (defaultState) => {
      table.setColumnVisibility(
        defaultState ? {} : table.initialState.columnVisibility ?? {}
      );
    };
    table.toggleAllColumnsVisible = (value) => {
      value = value ?? !table.getIsAllColumnsVisible();
      table.setColumnVisibility(
        table.getAllLeafColumns().reduce(
          (obj, column) => {
            var _a;
            return {
              ...obj,
              [column.id]: !value ? !((_a = column.getCanHide) == null ? void 0 : _a.call(column)) : value
            };
          },
          {}
        )
      );
    };
    table.getIsAllColumnsVisible = () => !table.getAllLeafColumns().some((column) => {
      var _a;
      return !((_a = column.getIsVisible) == null ? void 0 : _a.call(column));
    });
    table.getIsSomeColumnsVisible = () => table.getAllLeafColumns().some((column) => {
      var _a;
      return (_a = column.getIsVisible) == null ? void 0 : _a.call(column);
    });
    table.getToggleAllColumnsVisibilityHandler = () => {
      return (e) => {
        var _a;
        table.toggleAllColumnsVisible(
          (_a = e.target) == null ? void 0 : _a.checked
        );
      };
    };
  }
};
function _getVisibleLeafColumns(table, position) {
  return !position ? table.getVisibleLeafColumns() : position === "center" ? table.getCenterVisibleLeafColumns() : position === "left" ? table.getLeftVisibleLeafColumns() : table.getRightVisibleLeafColumns();
}

const ColumnOrdering = {
  _getInitialState: (state) => {
    return {
      columnOrder: [],
      ...state
    };
  },
  _getDefaultOptions: (table) => {
    return {
      onColumnOrderChange: makeStateUpdater("columnOrder", table)
    };
  },
  _createColumn: (column, table) => {
    column.getIndex = memo$1(
      (position) => [_getVisibleLeafColumns(table, position)],
      (columns) => columns.findIndex((d) => d.id === column.id),
      getMemoOptions(table.options, "debugColumns", "getIndex")
    );
    column.getIsFirstColumn = (position) => {
      var _a;
      const columns = _getVisibleLeafColumns(table, position);
      return ((_a = columns[0]) == null ? void 0 : _a.id) === column.id;
    };
    column.getIsLastColumn = (position) => {
      var _a;
      const columns = _getVisibleLeafColumns(table, position);
      return ((_a = columns[columns.length - 1]) == null ? void 0 : _a.id) === column.id;
    };
  },
  _createTable: (table) => {
    table.setColumnOrder = (updater) => {
      var _a, _b;
      return (_b = (_a = table.options).onColumnOrderChange) == null ? void 0 : _b.call(_a, updater);
    };
    table.resetColumnOrder = (defaultState) => {
      table.setColumnOrder(
        defaultState ? [] : table.initialState.columnOrder ?? []
      );
    };
    table._getOrderColumnsFn = memo$1(
      () => [
        table.getState().columnOrder,
        table.getState().grouping,
        table.options.groupedColumnMode
      ],
      (columnOrder, grouping, groupedColumnMode) => (columns) => {
        let orderedColumns = [];
        if (!(columnOrder == null ? void 0 : columnOrder.length)) {
          orderedColumns = columns;
        } else {
          const columnOrderCopy = [...columnOrder];
          const columnsCopy = [...columns];
          while (columnsCopy.length && columnOrderCopy.length) {
            const targetColumnId = columnOrderCopy.shift();
            const foundIndex = columnsCopy.findIndex(
              (d) => d.id === targetColumnId
            );
            if (foundIndex > -1) {
              orderedColumns.push(columnsCopy.splice(foundIndex, 1)[0]);
            }
          }
          orderedColumns = [...orderedColumns, ...columnsCopy];
        }
        return orderColumns(orderedColumns, grouping, groupedColumnMode);
      },
      getMemoOptions(table.options, "debugTable", "_getOrderColumnsFn")
    );
  }
};

const getDefaultColumnPinningState = () => ({
  left: [],
  right: []
});
const ColumnPinning = {
  _getInitialState: (state) => {
    return {
      columnPinning: getDefaultColumnPinningState(),
      ...state
    };
  },
  _getDefaultOptions: (table) => {
    return {
      onColumnPinningChange: makeStateUpdater("columnPinning", table)
    };
  },
  _createColumn: (column, table) => {
    column.pin = (position) => {
      const columnIds = column.getLeafColumns().map((d) => d.id).filter(Boolean);
      table.setColumnPinning((old) => {
        if (position === "right") {
          return {
            left: ((old == null ? void 0 : old.left) ?? []).filter((d) => !(columnIds == null ? void 0 : columnIds.includes(d))),
            right: [
              ...((old == null ? void 0 : old.right) ?? []).filter((d) => !(columnIds == null ? void 0 : columnIds.includes(d))),
              ...columnIds
            ]
          };
        }
        if (position === "left") {
          return {
            left: [
              ...((old == null ? void 0 : old.left) ?? []).filter((d) => !(columnIds == null ? void 0 : columnIds.includes(d))),
              ...columnIds
            ],
            right: ((old == null ? void 0 : old.right) ?? []).filter((d) => !(columnIds == null ? void 0 : columnIds.includes(d)))
          };
        }
        return {
          left: ((old == null ? void 0 : old.left) ?? []).filter((d) => !(columnIds == null ? void 0 : columnIds.includes(d))),
          right: ((old == null ? void 0 : old.right) ?? []).filter((d) => !(columnIds == null ? void 0 : columnIds.includes(d)))
        };
      });
    };
    column.getCanPin = () => {
      const leafColumns = column.getLeafColumns();
      return leafColumns.some(
        (d) => (d.columnDef.enablePinning ?? true) && (table.options.enableColumnPinning ?? table.options.enablePinning ?? true)
      );
    };
    column.getIsPinned = () => {
      const leafColumnIds = column.getLeafColumns().map((d) => d.id);
      const { left, right } = table.getState().columnPinning;
      const isLeft = leafColumnIds.some((d) => left == null ? void 0 : left.includes(d));
      const isRight = leafColumnIds.some((d) => right == null ? void 0 : right.includes(d));
      return isLeft ? "left" : isRight ? "right" : false;
    };
    column.getPinnedIndex = () => {
      var _a, _b;
      const position = column.getIsPinned();
      return position ? ((_b = (_a = table.getState().columnPinning) == null ? void 0 : _a[position]) == null ? void 0 : _b.indexOf(column.id)) ?? -1 : 0;
    };
  },
  _createRow: (row, table) => {
    row.getCenterVisibleCells = memo$1(
      () => [
        row._getAllVisibleCells(),
        table.getState().columnPinning.left,
        table.getState().columnPinning.right
      ],
      (allCells, left, right) => {
        const leftAndRight = [...left ?? [], ...right ?? []];
        return allCells.filter((d) => !leftAndRight.includes(d.column.id));
      },
      getMemoOptions(table.options, "debugRows", "getCenterVisibleCells")
    );
    row.getLeftVisibleCells = memo$1(
      () => [row._getAllVisibleCells(), table.getState().columnPinning.left],
      (allCells, left) => {
        const cells = (left ?? []).map((columnId) => allCells.find((cell) => cell.column.id === columnId)).filter(Boolean).map((d) => ({ ...d, position: "left" }));
        return cells;
      },
      getMemoOptions(table.options, "debugRows", "getLeftVisibleCells")
    );
    row.getRightVisibleCells = memo$1(
      () => [row._getAllVisibleCells(), table.getState().columnPinning.right],
      (allCells, right) => {
        const cells = (right ?? []).map((columnId) => allCells.find((cell) => cell.column.id === columnId)).filter(Boolean).map((d) => ({ ...d, position: "right" }));
        return cells;
      },
      getMemoOptions(table.options, "debugRows", "getRightVisibleCells")
    );
  },
  _createTable: (table) => {
    table.setColumnPinning = (updater) => {
      var _a, _b;
      return (_b = (_a = table.options).onColumnPinningChange) == null ? void 0 : _b.call(_a, updater);
    };
    table.resetColumnPinning = (defaultState) => {
      var _a;
      return table.setColumnPinning(
        defaultState ? getDefaultColumnPinningState() : ((_a = table.initialState) == null ? void 0 : _a.columnPinning) ?? getDefaultColumnPinningState()
      );
    };
    table.getIsSomeColumnsPinned = (position) => {
      var _a, _b, _c;
      const pinningState = table.getState().columnPinning;
      if (!position) {
        return Boolean(((_a = pinningState.left) == null ? void 0 : _a.length) || ((_b = pinningState.right) == null ? void 0 : _b.length));
      }
      return Boolean((_c = pinningState[position]) == null ? void 0 : _c.length);
    };
    table.getLeftLeafColumns = memo$1(
      () => [table.getAllLeafColumns(), table.getState().columnPinning.left],
      (allColumns, left) => {
        return (left ?? []).map((columnId) => allColumns.find((column) => column.id === columnId)).filter(Boolean);
      },
      getMemoOptions(table.options, "debugColumns", "getLeftLeafColumns")
    );
    table.getRightLeafColumns = memo$1(
      () => [table.getAllLeafColumns(), table.getState().columnPinning.right],
      (allColumns, right) => {
        return (right ?? []).map((columnId) => allColumns.find((column) => column.id === columnId)).filter(Boolean);
      },
      getMemoOptions(table.options, "debugColumns", "getRightLeafColumns")
    );
    table.getCenterLeafColumns = memo$1(
      () => [
        table.getAllLeafColumns(),
        table.getState().columnPinning.left,
        table.getState().columnPinning.right
      ],
      (allColumns, left, right) => {
        const leftAndRight = [...left ?? [], ...right ?? []];
        return allColumns.filter((d) => !leftAndRight.includes(d.id));
      },
      getMemoOptions(table.options, "debugColumns", "getCenterLeafColumns")
    );
  }
};

const defaultColumnSizing = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
};
const getDefaultColumnSizingInfoState = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: false,
  columnSizingStart: []
});
const ColumnSizing = {
  _getDefaultColumnDef: () => {
    return defaultColumnSizing;
  },
  _getInitialState: (state) => {
    return {
      columnSizing: {},
      columnSizingInfo: getDefaultColumnSizingInfoState(),
      ...state
    };
  },
  _getDefaultOptions: (table) => {
    return {
      columnResizeMode: "onEnd",
      columnResizeDirection: "ltr",
      onColumnSizingChange: makeStateUpdater("columnSizing", table),
      onColumnSizingInfoChange: makeStateUpdater("columnSizingInfo", table)
    };
  },
  _createColumn: (column, table) => {
    column.getSize = () => {
      const columnSize = table.getState().columnSizing[column.id];
      return Math.min(
        Math.max(
          column.columnDef.minSize ?? defaultColumnSizing.minSize,
          columnSize ?? column.columnDef.size ?? defaultColumnSizing.size
        ),
        column.columnDef.maxSize ?? defaultColumnSizing.maxSize
      );
    };
    column.getStart = memo$1(
      (position) => [
        position,
        _getVisibleLeafColumns(table, position),
        table.getState().columnSizing
      ],
      (position, columns) => columns.slice(0, column.getIndex(position)).reduce((sum, column2) => sum + column2.getSize(), 0),
      getMemoOptions(table.options, "debugColumns", "getStart")
    );
    column.getAfter = memo$1(
      (position) => [
        position,
        _getVisibleLeafColumns(table, position),
        table.getState().columnSizing
      ],
      (position, columns) => columns.slice(column.getIndex(position) + 1).reduce((sum, column2) => sum + column2.getSize(), 0),
      getMemoOptions(table.options, "debugColumns", "getAfter")
    );
    column.resetSize = () => {
      table.setColumnSizing(({ [column.id]: _, ...rest }) => {
        return rest;
      });
    };
    column.getCanResize = () => {
      return (column.columnDef.enableResizing ?? true) && (table.options.enableColumnResizing ?? true);
    };
    column.getIsResizing = () => {
      return table.getState().columnSizingInfo.isResizingColumn === column.id;
    };
  },
  _createHeader: (header, table) => {
    header.getSize = () => {
      let sum = 0;
      const recurse = (header2) => {
        if (header2.subHeaders.length) {
          header2.subHeaders.forEach(recurse);
        } else {
          sum += header2.column.getSize() ?? 0;
        }
      };
      recurse(header);
      return sum;
    };
    header.getStart = () => {
      if (header.index > 0) {
        const prevSiblingHeader = header.headerGroup.headers[header.index - 1];
        return prevSiblingHeader.getStart() + prevSiblingHeader.getSize();
      }
      return 0;
    };
    header.getResizeHandler = (_contextDocument) => {
      const column = table.getColumn(header.column.id);
      const canResize = column == null ? void 0 : column.getCanResize();
      return (e) => {
        var _a;
        if (!column || !canResize) {
          return;
        }
        (_a = e.persist) == null ? void 0 : _a.call(e);
        if (isTouchStartEvent(e)) {
          if (e.touches && e.touches.length > 1) {
            return;
          }
        }
        const startSize = header.getSize();
        const columnSizingStart = header ? header.getLeafHeaders().map((d) => [d.column.id, d.column.getSize()]) : [[column.id, column.getSize()]];
        const clientX = isTouchStartEvent(e) ? Math.round(e.touches[0].clientX) : e.clientX;
        const newColumnSizing = {};
        const updateOffset = (eventType, clientXPos) => {
          if (typeof clientXPos !== "number") {
            return;
          }
          table.setColumnSizingInfo((old) => {
            const deltaDirection = table.options.columnResizeDirection === "rtl" ? -1 : 1;
            const deltaOffset = (clientXPos - ((old == null ? void 0 : old.startOffset) ?? 0)) * deltaDirection;
            const deltaPercentage = Math.max(
              deltaOffset / ((old == null ? void 0 : old.startSize) ?? 0),
              -0.999999
            );
            old.columnSizingStart.forEach(([columnId, headerSize]) => {
              newColumnSizing[columnId] = Math.round(
                Math.max(headerSize + headerSize * deltaPercentage, 0) * 100
              ) / 100;
            });
            return {
              ...old,
              deltaOffset,
              deltaPercentage
            };
          });
          if (table.options.columnResizeMode === "onChange" || eventType === "end") {
            table.setColumnSizing((old) => ({
              ...old,
              ...newColumnSizing
            }));
          }
        };
        const onMove = (clientXPos) => updateOffset("move", clientXPos);
        const onEnd = (clientXPos) => {
          updateOffset("end", clientXPos);
          table.setColumnSizingInfo((old) => ({
            ...old,
            isResizingColumn: false,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        };
        const contextDocument = _contextDocument || typeof document !== "undefined" ? document : null;
        const mouseEvents = {
          moveHandler: (e2) => onMove(e2.clientX),
          upHandler: (e2) => {
            contextDocument == null ? void 0 : contextDocument.removeEventListener(
              "mousemove",
              mouseEvents.moveHandler
            );
            contextDocument == null ? void 0 : contextDocument.removeEventListener(
              "mouseup",
              mouseEvents.upHandler
            );
            onEnd(e2.clientX);
          }
        };
        const touchEvents = {
          moveHandler: (e2) => {
            if (e2.cancelable) {
              e2.preventDefault();
              e2.stopPropagation();
            }
            onMove(e2.touches[0].clientX);
            return false;
          },
          upHandler: (e2) => {
            var _a2;
            contextDocument == null ? void 0 : contextDocument.removeEventListener(
              "touchmove",
              touchEvents.moveHandler
            );
            contextDocument == null ? void 0 : contextDocument.removeEventListener(
              "touchend",
              touchEvents.upHandler
            );
            if (e2.cancelable) {
              e2.preventDefault();
              e2.stopPropagation();
            }
            onEnd((_a2 = e2.touches[0]) == null ? void 0 : _a2.clientX);
          }
        };
        const passiveIfSupported = passiveEventSupported() ? { passive: false } : false;
        if (isTouchStartEvent(e)) {
          contextDocument == null ? void 0 : contextDocument.addEventListener(
            "touchmove",
            touchEvents.moveHandler,
            passiveIfSupported
          );
          contextDocument == null ? void 0 : contextDocument.addEventListener(
            "touchend",
            touchEvents.upHandler,
            passiveIfSupported
          );
        } else {
          contextDocument == null ? void 0 : contextDocument.addEventListener(
            "mousemove",
            mouseEvents.moveHandler,
            passiveIfSupported
          );
          contextDocument == null ? void 0 : contextDocument.addEventListener(
            "mouseup",
            mouseEvents.upHandler,
            passiveIfSupported
          );
        }
        table.setColumnSizingInfo((old) => ({
          ...old,
          startOffset: clientX,
          startSize,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart,
          isResizingColumn: column.id
        }));
      };
    };
  },
  _createTable: (table) => {
    table.setColumnSizing = (updater) => {
      var _a, _b;
      return (_b = (_a = table.options).onColumnSizingChange) == null ? void 0 : _b.call(_a, updater);
    };
    table.setColumnSizingInfo = (updater) => {
      var _a, _b;
      return (_b = (_a = table.options).onColumnSizingInfoChange) == null ? void 0 : _b.call(_a, updater);
    };
    table.resetColumnSizing = (defaultState) => {
      table.setColumnSizing(
        defaultState ? {} : table.initialState.columnSizing ?? {}
      );
    };
    table.resetHeaderSizeInfo = (defaultState) => {
      table.setColumnSizingInfo(
        defaultState ? getDefaultColumnSizingInfoState() : table.initialState.columnSizingInfo ?? getDefaultColumnSizingInfoState()
      );
    };
    table.getTotalSize = () => {
      var _a;
      return ((_a = table.getHeaderGroups()[0]) == null ? void 0 : _a.headers.reduce((sum, header) => {
        return sum + header.getSize();
      }, 0)) ?? 0;
    };
    table.getLeftTotalSize = () => {
      var _a;
      return ((_a = table.getLeftHeaderGroups()[0]) == null ? void 0 : _a.headers.reduce((sum, header) => {
        return sum + header.getSize();
      }, 0)) ?? 0;
    };
    table.getCenterTotalSize = () => {
      var _a;
      return ((_a = table.getCenterHeaderGroups()[0]) == null ? void 0 : _a.headers.reduce((sum, header) => {
        return sum + header.getSize();
      }, 0)) ?? 0;
    };
    table.getRightTotalSize = () => {
      var _a;
      return ((_a = table.getRightHeaderGroups()[0]) == null ? void 0 : _a.headers.reduce((sum, header) => {
        return sum + header.getSize();
      }, 0)) ?? 0;
    };
  }
};
let passiveSupported = null;
function passiveEventSupported() {
  if (typeof passiveSupported === "boolean") return passiveSupported;
  let supported = false;
  try {
    const options = {
      get passive() {
        supported = true;
        return false;
      }
    };
    const noop = () => {
    };
    window.addEventListener("test", noop, options);
    window.removeEventListener("test", noop);
  } catch (err) {
    supported = false;
  }
  passiveSupported = supported;
  return passiveSupported;
}
function isTouchStartEvent(e) {
  return e.type === "touchstart";
}

const GlobalFaceting = {
  _createTable: (table) => {
    table._getGlobalFacetedRowModel = table.options.getFacetedRowModel && table.options.getFacetedRowModel(table, "__global__");
    table.getGlobalFacetedRowModel = () => {
      if (table.options.manualFiltering || !table._getGlobalFacetedRowModel) {
        return table.getPreFilteredRowModel();
      }
      return table._getGlobalFacetedRowModel();
    };
    table._getGlobalFacetedUniqueValues = table.options.getFacetedUniqueValues && table.options.getFacetedUniqueValues(table, "__global__");
    table.getGlobalFacetedUniqueValues = () => {
      if (!table._getGlobalFacetedUniqueValues) {
        return /* @__PURE__ */ new Map();
      }
      return table._getGlobalFacetedUniqueValues();
    };
    table._getGlobalFacetedMinMaxValues = table.options.getFacetedMinMaxValues && table.options.getFacetedMinMaxValues(table, "__global__");
    table.getGlobalFacetedMinMaxValues = () => {
      if (!table._getGlobalFacetedMinMaxValues) {
        return;
      }
      return table._getGlobalFacetedMinMaxValues();
    };
  }
};

const GlobalFiltering = {
  _getInitialState: (state) => {
    return {
      globalFilter: void 0,
      ...state
    };
  },
  _getDefaultOptions: (table) => {
    return {
      onGlobalFilterChange: makeStateUpdater("globalFilter", table),
      globalFilterFn: "auto",
      getColumnCanGlobalFilter: (column) => {
        var _a, _b;
        const value = (_b = (_a = table.getCoreRowModel().flatRows[0]) == null ? void 0 : _a._getAllCellsByColumnId()[column.id]) == null ? void 0 : _b.getValue();
        return typeof value === "string" || typeof value === "number";
      }
    };
  },
  _createColumn: (column, table) => {
    column.getCanGlobalFilter = () => {
      var _a, _b;
      return (column.columnDef.enableGlobalFilter ?? true) && (table.options.enableGlobalFilter ?? true) && (table.options.enableFilters ?? true) && (((_b = (_a = table.options).getColumnCanGlobalFilter) == null ? void 0 : _b.call(_a, column)) ?? true) && !!column.accessorFn;
    };
  },
  _createTable: (table) => {
    table.getGlobalAutoFilterFn = () => {
      return filterFns.includesString;
    };
    table.getGlobalFilterFn = () => {
      var _a;
      const { globalFilterFn } = table.options;
      return isFunction(globalFilterFn) ? globalFilterFn : globalFilterFn === "auto" ? table.getGlobalAutoFilterFn() : ((_a = table.options.filterFns) == null ? void 0 : _a[globalFilterFn]) ?? filterFns[globalFilterFn];
    };
    table.setGlobalFilter = (updater) => {
      var _a, _b;
      (_b = (_a = table.options).onGlobalFilterChange) == null ? void 0 : _b.call(_a, updater);
    };
    table.resetGlobalFilter = (defaultState) => {
      table.setGlobalFilter(
        defaultState ? void 0 : table.initialState.globalFilter
      );
    };
  }
};

const RowExpanding = {
  _getInitialState: (state) => {
    return {
      expanded: {},
      ...state
    };
  },
  _getDefaultOptions: (table) => {
    return {
      onExpandedChange: makeStateUpdater("expanded", table),
      paginateExpandedRows: true
    };
  },
  _createTable: (table) => {
    let registered = false;
    let queued = false;
    table._autoResetExpanded = () => {
      if (!registered) {
        table._queue(() => {
          registered = true;
        });
        return;
      }
      if (table.options.autoResetAll ?? table.options.autoResetExpanded ?? !table.options.manualExpanding) {
        if (queued) return;
        queued = true;
        table._queue(() => {
          table.resetExpanded();
          queued = false;
        });
      }
    };
    table.setExpanded = (updater) => {
      var _a, _b;
      return (_b = (_a = table.options).onExpandedChange) == null ? void 0 : _b.call(_a, updater);
    };
    table.toggleAllRowsExpanded = (expanded) => {
      if (expanded ?? !table.getIsAllRowsExpanded()) {
        table.setExpanded(true);
      } else {
        table.setExpanded({});
      }
    };
    table.resetExpanded = (defaultState) => {
      var _a;
      table.setExpanded(defaultState ? {} : ((_a = table.initialState) == null ? void 0 : _a.expanded) ?? {});
    };
    table.getCanSomeRowsExpand = () => {
      return table.getPrePaginationRowModel().flatRows.some((row) => row.getCanExpand());
    };
    table.getToggleAllRowsExpandedHandler = () => {
      return (e) => {
        var _a;
        (_a = e.persist) == null ? void 0 : _a.call(e);
        table.toggleAllRowsExpanded();
      };
    };
    table.getIsSomeRowsExpanded = () => {
      const expanded = table.getState().expanded;
      return expanded === true || Object.values(expanded).some(Boolean);
    };
    table.getIsAllRowsExpanded = () => {
      const expanded = table.getState().expanded;
      if (typeof expanded === "boolean") {
        return expanded === true;
      }
      if (!Object.keys(expanded).length) {
        return false;
      }
      if (table.getRowModel().flatRows.some((row) => !row.getIsExpanded())) {
        return false;
      }
      return true;
    };
    table.getExpandedDepth = () => {
      let maxDepth = 0;
      const rowIds = table.getState().expanded === true ? Object.keys(table.getRowModel().rowsById) : Object.keys(table.getState().expanded);
      rowIds.forEach((id) => {
        const splitId = id.split(".");
        maxDepth = Math.max(maxDepth, splitId.length);
      });
      return maxDepth;
    };
    table.getPreExpandedRowModel = () => table.getSortedRowModel();
    table.getExpandedRowModel = () => {
      if (!table._getExpandedRowModel && table.options.getExpandedRowModel) {
        table._getExpandedRowModel = table.options.getExpandedRowModel(table);
      }
      if (table.options.manualExpanding || !table._getExpandedRowModel) {
        return table.getPreExpandedRowModel();
      }
      return table._getExpandedRowModel();
    };
  },
  _createRow: (row, table) => {
    row.toggleExpanded = (expanded) => {
      table.setExpanded((old) => {
        const exists = old === true ? true : !!(old == null ? void 0 : old[row.id]);
        let oldExpanded = {};
        if (old === true) {
          Object.keys(table.getRowModel().rowsById).forEach((rowId) => {
            oldExpanded[rowId] = true;
          });
        } else {
          oldExpanded = old;
        }
        expanded = expanded ?? !exists;
        if (!exists && expanded) {
          return {
            ...oldExpanded,
            [row.id]: true
          };
        }
        if (exists && !expanded) {
          const { [row.id]: _, ...rest } = oldExpanded;
          return rest;
        }
        return old;
      });
    };
    row.getIsExpanded = () => {
      var _a, _b;
      const expanded = table.getState().expanded;
      return !!(((_b = (_a = table.options).getIsRowExpanded) == null ? void 0 : _b.call(_a, row)) ?? (expanded === true || (expanded == null ? void 0 : expanded[row.id])));
    };
    row.getCanExpand = () => {
      var _a, _b, _c;
      return ((_b = (_a = table.options).getRowCanExpand) == null ? void 0 : _b.call(_a, row)) ?? ((table.options.enableExpanding ?? true) && !!((_c = row.subRows) == null ? void 0 : _c.length));
    };
    row.getIsAllParentsExpanded = () => {
      let isFullyExpanded = true;
      let currentRow = row;
      while (isFullyExpanded && currentRow.parentId) {
        currentRow = table.getRow(currentRow.parentId, true);
        isFullyExpanded = currentRow.getIsExpanded();
      }
      return isFullyExpanded;
    };
    row.getToggleExpandedHandler = () => {
      const canExpand = row.getCanExpand();
      return () => {
        if (!canExpand) return;
        row.toggleExpanded();
      };
    };
  }
};

const defaultPageIndex = 0;
const defaultPageSize = 10;
const getDefaultPaginationState = () => ({
  pageIndex: defaultPageIndex,
  pageSize: defaultPageSize
});
const RowPagination = {
  _getInitialState: (state) => {
    return {
      ...state,
      pagination: {
        ...getDefaultPaginationState(),
        ...state == null ? void 0 : state.pagination
      }
    };
  },
  _getDefaultOptions: (table) => {
    return {
      onPaginationChange: makeStateUpdater("pagination", table)
    };
  },
  _createTable: (table) => {
    let registered = false;
    let queued = false;
    table._autoResetPageIndex = () => {
      if (!registered) {
        table._queue(() => {
          registered = true;
        });
        return;
      }
      if (table.options.autoResetAll ?? table.options.autoResetPageIndex ?? !table.options.manualPagination) {
        if (queued) return;
        queued = true;
        table._queue(() => {
          table.resetPageIndex();
          queued = false;
        });
      }
    };
    table.setPagination = (updater) => {
      var _a, _b;
      const safeUpdater = (old) => {
        let newState = functionalUpdate(updater, old);
        return newState;
      };
      return (_b = (_a = table.options).onPaginationChange) == null ? void 0 : _b.call(_a, safeUpdater);
    };
    table.resetPagination = (defaultState) => {
      table.setPagination(
        defaultState ? getDefaultPaginationState() : table.initialState.pagination ?? getDefaultPaginationState()
      );
    };
    table.setPageIndex = (updater) => {
      table.setPagination((old) => {
        let pageIndex = functionalUpdate(updater, old.pageIndex);
        const maxPageIndex = typeof table.options.pageCount === "undefined" || table.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : table.options.pageCount - 1;
        pageIndex = Math.max(0, Math.min(pageIndex, maxPageIndex));
        return {
          ...old,
          pageIndex
        };
      });
    };
    table.resetPageIndex = (defaultState) => {
      var _a, _b;
      table.setPageIndex(
        defaultState ? defaultPageIndex : ((_b = (_a = table.initialState) == null ? void 0 : _a.pagination) == null ? void 0 : _b.pageIndex) ?? defaultPageIndex
      );
    };
    table.resetPageSize = (defaultState) => {
      var _a, _b;
      table.setPageSize(
        defaultState ? defaultPageSize : ((_b = (_a = table.initialState) == null ? void 0 : _a.pagination) == null ? void 0 : _b.pageSize) ?? defaultPageSize
      );
    };
    table.setPageSize = (updater) => {
      table.setPagination((old) => {
        const pageSize = Math.max(1, functionalUpdate(updater, old.pageSize));
        const topRowIndex = old.pageSize * old.pageIndex;
        const pageIndex = Math.floor(topRowIndex / pageSize);
        return {
          ...old,
          pageIndex,
          pageSize
        };
      });
    };
    table.setPageCount = (updater) => table.setPagination((old) => {
      let newPageCount = functionalUpdate(
        updater,
        table.options.pageCount ?? -1
      );
      if (typeof newPageCount === "number") {
        newPageCount = Math.max(-1, newPageCount);
      }
      return {
        ...old,
        pageCount: newPageCount
      };
    });
    table.getPageOptions = memo$1(
      () => [table.getPageCount()],
      (pageCount) => {
        let pageOptions = [];
        if (pageCount && pageCount > 0) {
          pageOptions = [...new Array(pageCount)].fill(null).map((_, i) => i);
        }
        return pageOptions;
      },
      getMemoOptions(table.options, "debugTable", "getPageOptions")
    );
    table.getCanPreviousPage = () => table.getState().pagination.pageIndex > 0;
    table.getCanNextPage = () => {
      const { pageIndex } = table.getState().pagination;
      const pageCount = table.getPageCount();
      if (pageCount === -1) {
        return true;
      }
      if (pageCount === 0) {
        return false;
      }
      return pageIndex < pageCount - 1;
    };
    table.previousPage = () => {
      return table.setPageIndex((old) => old - 1);
    };
    table.nextPage = () => {
      return table.setPageIndex((old) => {
        return old + 1;
      });
    };
    table.firstPage = () => {
      return table.setPageIndex(0);
    };
    table.lastPage = () => {
      return table.setPageIndex(table.getPageCount() - 1);
    };
    table.getPrePaginationRowModel = () => table.getExpandedRowModel();
    table.getPaginationRowModel = () => {
      if (!table._getPaginationRowModel && table.options.getPaginationRowModel) {
        table._getPaginationRowModel = table.options.getPaginationRowModel(table);
      }
      if (table.options.manualPagination || !table._getPaginationRowModel) {
        return table.getPrePaginationRowModel();
      }
      return table._getPaginationRowModel();
    };
    table.getPageCount = () => {
      return table.options.pageCount ?? Math.ceil(table.getRowCount() / table.getState().pagination.pageSize);
    };
    table.getRowCount = () => {
      return table.options.rowCount ?? table.getPrePaginationRowModel().rows.length;
    };
  }
};

const getDefaultRowPinningState = () => ({
  top: [],
  bottom: []
});
const RowPinning = {
  _getInitialState: (state) => {
    return {
      rowPinning: getDefaultRowPinningState(),
      ...state
    };
  },
  _getDefaultOptions: (table) => {
    return {
      onRowPinningChange: makeStateUpdater("rowPinning", table)
    };
  },
  _createRow: (row, table) => {
    row.pin = (position, includeLeafRows, includeParentRows) => {
      const leafRowIds = includeLeafRows ? row.getLeafRows().map(({ id }) => id) : [];
      const parentRowIds = includeParentRows ? row.getParentRows().map(({ id }) => id) : [];
      const rowIds = /* @__PURE__ */ new Set([...parentRowIds, row.id, ...leafRowIds]);
      table.setRowPinning((old) => {
        if (position === "bottom") {
          return {
            top: ((old == null ? void 0 : old.top) ?? []).filter((d) => !(rowIds == null ? void 0 : rowIds.has(d))),
            bottom: [
              ...((old == null ? void 0 : old.bottom) ?? []).filter((d) => !(rowIds == null ? void 0 : rowIds.has(d))),
              ...Array.from(rowIds)
            ]
          };
        }
        if (position === "top") {
          return {
            top: [
              ...((old == null ? void 0 : old.top) ?? []).filter((d) => !(rowIds == null ? void 0 : rowIds.has(d))),
              ...Array.from(rowIds)
            ],
            bottom: ((old == null ? void 0 : old.bottom) ?? []).filter((d) => !(rowIds == null ? void 0 : rowIds.has(d)))
          };
        }
        return {
          top: ((old == null ? void 0 : old.top) ?? []).filter((d) => !(rowIds == null ? void 0 : rowIds.has(d))),
          bottom: ((old == null ? void 0 : old.bottom) ?? []).filter((d) => !(rowIds == null ? void 0 : rowIds.has(d)))
        };
      });
    };
    row.getCanPin = () => {
      const { enableRowPinning, enablePinning } = table.options;
      if (typeof enableRowPinning === "function") {
        return enableRowPinning(row);
      }
      return enableRowPinning ?? enablePinning ?? true;
    };
    row.getIsPinned = () => {
      const rowIds = [row.id];
      const { top, bottom } = table.getState().rowPinning;
      const isTop = rowIds.some((d) => top == null ? void 0 : top.includes(d));
      const isBottom = rowIds.some((d) => bottom == null ? void 0 : bottom.includes(d));
      return isTop ? "top" : isBottom ? "bottom" : false;
    };
    row.getPinnedIndex = () => {
      var _a;
      const position = row.getIsPinned();
      if (!position) return -1;
      const visiblePinnedRowIds = (_a = position === "top" ? table.getTopRows() : table.getBottomRows()) == null ? void 0 : _a.map(({ id }) => id);
      return (visiblePinnedRowIds == null ? void 0 : visiblePinnedRowIds.indexOf(row.id)) ?? -1;
    };
  },
  _createTable: (table) => {
    table.setRowPinning = (updater) => {
      var _a, _b;
      return (_b = (_a = table.options).onRowPinningChange) == null ? void 0 : _b.call(_a, updater);
    };
    table.resetRowPinning = (defaultState) => {
      var _a;
      return table.setRowPinning(
        defaultState ? getDefaultRowPinningState() : ((_a = table.initialState) == null ? void 0 : _a.rowPinning) ?? getDefaultRowPinningState()
      );
    };
    table.getIsSomeRowsPinned = (position) => {
      var _a, _b, _c;
      const pinningState = table.getState().rowPinning;
      if (!position) {
        return Boolean(((_a = pinningState.top) == null ? void 0 : _a.length) || ((_b = pinningState.bottom) == null ? void 0 : _b.length));
      }
      return Boolean((_c = pinningState[position]) == null ? void 0 : _c.length);
    };
    table._getPinnedRows = (visibleRows, pinnedRowIds, position) => {
      const rows = table.options.keepPinnedRows ?? true ? (
        //get all rows that are pinned even if they would not be otherwise visible
        //account for expanded parent rows, but not pagination or filtering
        (pinnedRowIds ?? []).map((rowId) => {
          const row = table.getRow(rowId, true);
          return row.getIsAllParentsExpanded() ? row : null;
        })
      ) : (
        //else get only visible rows that are pinned
        (pinnedRowIds ?? []).map(
          (rowId) => visibleRows.find((row) => row.id === rowId)
        )
      );
      return rows.filter(Boolean).map((d) => ({ ...d, position }));
    };
    table.getTopRows = memo$1(
      () => [table.getRowModel().rows, table.getState().rowPinning.top],
      (allRows, topPinnedRowIds) => table._getPinnedRows(allRows, topPinnedRowIds, "top"),
      getMemoOptions(table.options, "debugRows", "getTopRows")
    );
    table.getBottomRows = memo$1(
      () => [table.getRowModel().rows, table.getState().rowPinning.bottom],
      (allRows, bottomPinnedRowIds) => table._getPinnedRows(allRows, bottomPinnedRowIds, "bottom"),
      getMemoOptions(table.options, "debugRows", "getBottomRows")
    );
    table.getCenterRows = memo$1(
      () => [
        table.getRowModel().rows,
        table.getState().rowPinning.top,
        table.getState().rowPinning.bottom
      ],
      (allRows, top, bottom) => {
        const topAndBottom = /* @__PURE__ */ new Set([...top ?? [], ...bottom ?? []]);
        return allRows.filter((d) => !topAndBottom.has(d.id));
      },
      getMemoOptions(table.options, "debugRows", "getCenterRows")
    );
  }
};

const RowSelection = {
  _getInitialState: (state) => {
    return {
      rowSelection: {},
      ...state
    };
  },
  _getDefaultOptions: (table) => {
    return {
      onRowSelectionChange: makeStateUpdater("rowSelection", table),
      enableRowSelection: true,
      enableMultiRowSelection: true,
      enableSubRowSelection: true
      // enableGroupingRowSelection: false,
      // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
      // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
    };
  },
  _createTable: (table) => {
    table.setRowSelection = (updater) => {
      var _a, _b;
      return (_b = (_a = table.options).onRowSelectionChange) == null ? void 0 : _b.call(_a, updater);
    };
    table.resetRowSelection = (defaultState) => table.setRowSelection(
      defaultState ? {} : table.initialState.rowSelection ?? {}
    );
    table.toggleAllRowsSelected = (value) => {
      table.setRowSelection((old) => {
        value = typeof value !== "undefined" ? value : !table.getIsAllRowsSelected();
        const rowSelection = { ...old };
        const preGroupedFlatRows = table.getPreGroupedRowModel().flatRows;
        if (value) {
          preGroupedFlatRows.forEach((row) => {
            if (!row.getCanSelect()) {
              return;
            }
            rowSelection[row.id] = true;
          });
        } else {
          preGroupedFlatRows.forEach((row) => {
            delete rowSelection[row.id];
          });
        }
        return rowSelection;
      });
    };
    table.toggleAllPageRowsSelected = (value) => table.setRowSelection((old) => {
      const resolvedValue = typeof value !== "undefined" ? value : !table.getIsAllPageRowsSelected();
      const rowSelection = { ...old };
      table.getRowModel().rows.forEach((row) => {
        mutateRowIsSelected(rowSelection, row.id, resolvedValue, true, table);
      });
      return rowSelection;
    });
    table.getPreSelectedRowModel = () => table.getCoreRowModel();
    table.getSelectedRowModel = memo$1(
      () => [table.getState().rowSelection, table.getCoreRowModel()],
      (rowSelection, rowModel) => {
        if (!Object.keys(rowSelection).length) {
          return {
            rows: [],
            flatRows: [],
            rowsById: {}
          };
        }
        return selectRowsFn(table, rowModel);
      },
      getMemoOptions(table.options, "debugTable", "getSelectedRowModel")
    );
    table.getFilteredSelectedRowModel = memo$1(
      () => [table.getState().rowSelection, table.getFilteredRowModel()],
      (rowSelection, rowModel) => {
        if (!Object.keys(rowSelection).length) {
          return {
            rows: [],
            flatRows: [],
            rowsById: {}
          };
        }
        return selectRowsFn(table, rowModel);
      },
      getMemoOptions(table.options, "debugTable", "getFilteredSelectedRowModel")
    );
    table.getGroupedSelectedRowModel = memo$1(
      () => [table.getState().rowSelection, table.getSortedRowModel()],
      (rowSelection, rowModel) => {
        if (!Object.keys(rowSelection).length) {
          return {
            rows: [],
            flatRows: [],
            rowsById: {}
          };
        }
        return selectRowsFn(table, rowModel);
      },
      getMemoOptions(table.options, "debugTable", "getGroupedSelectedRowModel")
    );
    table.getIsAllRowsSelected = () => {
      const preGroupedFlatRows = table.getFilteredRowModel().flatRows;
      const { rowSelection } = table.getState();
      let isAllRowsSelected = Boolean(
        preGroupedFlatRows.length && Object.keys(rowSelection).length
      );
      if (isAllRowsSelected) {
        if (preGroupedFlatRows.some(
          (row) => row.getCanSelect() && !rowSelection[row.id]
        )) {
          isAllRowsSelected = false;
        }
      }
      return isAllRowsSelected;
    };
    table.getIsAllPageRowsSelected = () => {
      const paginationFlatRows = table.getPaginationRowModel().flatRows.filter((row) => row.getCanSelect());
      const { rowSelection } = table.getState();
      let isAllPageRowsSelected = !!paginationFlatRows.length;
      if (isAllPageRowsSelected && paginationFlatRows.some((row) => !rowSelection[row.id])) {
        isAllPageRowsSelected = false;
      }
      return isAllPageRowsSelected;
    };
    table.getIsSomeRowsSelected = () => {
      const totalSelected = Object.keys(
        table.getState().rowSelection ?? {}
      ).length;
      return totalSelected > 0 && totalSelected < table.getFilteredRowModel().flatRows.length;
    };
    table.getIsSomePageRowsSelected = () => {
      const paginationFlatRows = table.getPaginationRowModel().flatRows;
      return table.getIsAllPageRowsSelected() ? false : paginationFlatRows.filter((row) => row.getCanSelect()).some((d) => d.getIsSelected() || d.getIsSomeSelected());
    };
    table.getToggleAllRowsSelectedHandler = () => {
      return (e) => {
        table.toggleAllRowsSelected(
          e.target.checked
        );
      };
    };
    table.getToggleAllPageRowsSelectedHandler = () => {
      return (e) => {
        table.toggleAllPageRowsSelected(
          e.target.checked
        );
      };
    };
  },
  _createRow: (row, table) => {
    row.toggleSelected = (value, opts) => {
      const isSelected = row.getIsSelected();
      table.setRowSelection((old) => {
        value = typeof value !== "undefined" ? value : !isSelected;
        if (row.getCanSelect() && isSelected === value) {
          return old;
        }
        const selectedRowIds = { ...old };
        mutateRowIsSelected(
          selectedRowIds,
          row.id,
          value,
          (opts == null ? void 0 : opts.selectChildren) ?? true,
          table
        );
        return selectedRowIds;
      });
    };
    row.getIsSelected = () => {
      const { rowSelection } = table.getState();
      return isRowSelected(row, rowSelection);
    };
    row.getIsSomeSelected = () => {
      const { rowSelection } = table.getState();
      return isSubRowSelected(row, rowSelection) === "some";
    };
    row.getIsAllSubRowsSelected = () => {
      const { rowSelection } = table.getState();
      return isSubRowSelected(row, rowSelection) === "all";
    };
    row.getCanSelect = () => {
      if (typeof table.options.enableRowSelection === "function") {
        return table.options.enableRowSelection(row);
      }
      return table.options.enableRowSelection ?? true;
    };
    row.getCanSelectSubRows = () => {
      if (typeof table.options.enableSubRowSelection === "function") {
        return table.options.enableSubRowSelection(row);
      }
      return table.options.enableSubRowSelection ?? true;
    };
    row.getCanMultiSelect = () => {
      if (typeof table.options.enableMultiRowSelection === "function") {
        return table.options.enableMultiRowSelection(row);
      }
      return table.options.enableMultiRowSelection ?? true;
    };
    row.getToggleSelectedHandler = () => {
      const canSelect = row.getCanSelect();
      return (e) => {
        var _a;
        if (!canSelect) return;
        row.toggleSelected(
          (_a = e.target) == null ? void 0 : _a.checked
        );
      };
    };
  }
};
const mutateRowIsSelected = (selectedRowIds, id, value, includeChildren, table) => {
  var _a;
  const row = table.getRow(id, true);
  if (value) {
    if (!row.getCanMultiSelect()) {
      Object.keys(selectedRowIds).forEach((key) => delete selectedRowIds[key]);
    }
    if (row.getCanSelect()) {
      selectedRowIds[id] = true;
    }
  } else {
    delete selectedRowIds[id];
  }
  if (includeChildren && ((_a = row.subRows) == null ? void 0 : _a.length) && row.getCanSelectSubRows()) {
    row.subRows.forEach(
      (row2) => mutateRowIsSelected(selectedRowIds, row2.id, value, includeChildren, table)
    );
  }
};
function selectRowsFn(table, rowModel) {
  const rowSelection = table.getState().rowSelection;
  const newSelectedFlatRows = [];
  const newSelectedRowsById = {};
  const recurseRows = (rows, depth = 0) => {
    return rows.map((row) => {
      var _a;
      const isSelected = isRowSelected(row, rowSelection);
      if (isSelected) {
        newSelectedFlatRows.push(row);
        newSelectedRowsById[row.id] = row;
      }
      if ((_a = row.subRows) == null ? void 0 : _a.length) {
        row = {
          ...row,
          subRows: recurseRows(row.subRows, depth + 1)
        };
      }
      if (isSelected) {
        return row;
      }
    }).filter(Boolean);
  };
  return {
    rows: recurseRows(rowModel.rows),
    flatRows: newSelectedFlatRows,
    rowsById: newSelectedRowsById
  };
}
function isRowSelected(row, selection) {
  return selection[row.id] ?? false;
}
function isSubRowSelected(row, selection, table) {
  var _a;
  if (!((_a = row.subRows) == null ? void 0 : _a.length)) return false;
  let allChildrenSelected = true;
  let someSelected = false;
  row.subRows.forEach((subRow) => {
    if (someSelected && !allChildrenSelected) {
      return;
    }
    if (subRow.getCanSelect()) {
      if (isRowSelected(subRow, selection)) {
        someSelected = true;
      } else {
        allChildrenSelected = false;
      }
    }
    if (subRow.subRows && subRow.subRows.length) {
      const subRowChildrenSelected = isSubRowSelected(subRow, selection);
      if (subRowChildrenSelected === "all") {
        someSelected = true;
      } else if (subRowChildrenSelected === "some") {
        someSelected = true;
        allChildrenSelected = false;
      } else {
        allChildrenSelected = false;
      }
    }
  });
  return allChildrenSelected ? "all" : someSelected ? "some" : false;
}

const reSplitAlphaNumeric = /([0-9]+)/gm;
const alphanumeric = (rowA, rowB, columnId) => {
  return compareAlphanumeric(
    toString(rowA.getValue(columnId)).toLowerCase(),
    toString(rowB.getValue(columnId)).toLowerCase()
  );
};
const alphanumericCaseSensitive = (rowA, rowB, columnId) => {
  return compareAlphanumeric(
    toString(rowA.getValue(columnId)),
    toString(rowB.getValue(columnId))
  );
};
const text = (rowA, rowB, columnId) => {
  return compareBasic(
    toString(rowA.getValue(columnId)).toLowerCase(),
    toString(rowB.getValue(columnId)).toLowerCase()
  );
};
const textCaseSensitive = (rowA, rowB, columnId) => {
  return compareBasic(
    toString(rowA.getValue(columnId)),
    toString(rowB.getValue(columnId))
  );
};
const datetime = (rowA, rowB, columnId) => {
  const a = rowA.getValue(columnId);
  const b = rowB.getValue(columnId);
  return a > b ? 1 : a < b ? -1 : 0;
};
const basic = (rowA, rowB, columnId) => {
  return compareBasic(rowA.getValue(columnId), rowB.getValue(columnId));
};
function compareBasic(a, b) {
  return a === b ? 0 : a > b ? 1 : -1;
}
function toString(a) {
  if (typeof a === "number") {
    if (isNaN(a) || a === Infinity || a === -Infinity) {
      return "";
    }
    return String(a);
  }
  if (typeof a === "string") {
    return a;
  }
  return "";
}
function compareAlphanumeric(aStr, bStr) {
  const a = aStr.split(reSplitAlphaNumeric).filter(Boolean);
  const b = bStr.split(reSplitAlphaNumeric).filter(Boolean);
  while (a.length && b.length) {
    const aa = a.shift();
    const bb = b.shift();
    const an = parseInt(aa, 10);
    const bn = parseInt(bb, 10);
    const combo = [an, bn].sort();
    if (isNaN(combo[0])) {
      if (aa > bb) {
        return 1;
      }
      if (bb > aa) {
        return -1;
      }
      continue;
    }
    if (isNaN(combo[1])) {
      return isNaN(an) ? -1 : 1;
    }
    if (an > bn) {
      return 1;
    }
    if (bn > an) {
      return -1;
    }
  }
  return a.length - b.length;
}
const sortingFns = {
  alphanumeric,
  alphanumericCaseSensitive,
  text,
  textCaseSensitive,
  datetime,
  basic
};

const RowSorting = {
  _getInitialState: (state) => {
    return {
      sorting: [],
      ...state
    };
  },
  _getDefaultColumnDef: () => {
    return {
      sortingFn: "auto",
      sortUndefined: 1
    };
  },
  _getDefaultOptions: (table) => {
    return {
      onSortingChange: makeStateUpdater("sorting", table),
      isMultiSortEvent: (e) => {
        return e.shiftKey;
      }
    };
  },
  _createColumn: (column, table) => {
    column.getAutoSortingFn = () => {
      const firstRows = table.getFilteredRowModel().flatRows.slice(10);
      let isString = false;
      for (const row of firstRows) {
        const value = row == null ? void 0 : row.getValue(column.id);
        if (Object.prototype.toString.call(value) === "[object Date]") {
          return sortingFns.datetime;
        }
        if (typeof value === "string") {
          isString = true;
          if (value.split(reSplitAlphaNumeric).length > 1) {
            return sortingFns.alphanumeric;
          }
        }
      }
      if (isString) {
        return sortingFns.text;
      }
      return sortingFns.basic;
    };
    column.getAutoSortDir = () => {
      const firstRow = table.getFilteredRowModel().flatRows[0];
      const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
      if (typeof value === "string") {
        return "asc";
      }
      return "desc";
    };
    column.getSortingFn = () => {
      var _a;
      if (!column) {
        throw new Error();
      }
      return isFunction(column.columnDef.sortingFn) ? column.columnDef.sortingFn : column.columnDef.sortingFn === "auto" ? column.getAutoSortingFn() : ((_a = table.options.sortingFns) == null ? void 0 : _a[column.columnDef.sortingFn]) ?? sortingFns[column.columnDef.sortingFn];
    };
    column.toggleSorting = (desc, multi) => {
      const nextSortingOrder = column.getNextSortingOrder();
      const hasManualValue = typeof desc !== "undefined" && desc !== null;
      table.setSorting((old) => {
        const existingSorting = old == null ? void 0 : old.find((d) => d.id === column.id);
        const existingIndex = old == null ? void 0 : old.findIndex((d) => d.id === column.id);
        let newSorting = [];
        let sortAction;
        let nextDesc = hasManualValue ? desc : nextSortingOrder === "desc";
        if ((old == null ? void 0 : old.length) && column.getCanMultiSort() && multi) {
          if (existingSorting) {
            sortAction = "toggle";
          } else {
            sortAction = "add";
          }
        } else {
          if ((old == null ? void 0 : old.length) && existingIndex !== old.length - 1) {
            sortAction = "replace";
          } else if (existingSorting) {
            sortAction = "toggle";
          } else {
            sortAction = "replace";
          }
        }
        if (sortAction === "toggle") {
          if (!hasManualValue) {
            if (!nextSortingOrder) {
              sortAction = "remove";
            }
          }
        }
        if (sortAction === "add") {
          newSorting = [
            ...old,
            {
              id: column.id,
              desc: nextDesc
            }
          ];
          newSorting.splice(
            0,
            newSorting.length - (table.options.maxMultiSortColCount ?? Number.MAX_SAFE_INTEGER)
          );
        } else if (sortAction === "toggle") {
          newSorting = old.map((d) => {
            if (d.id === column.id) {
              return {
                ...d,
                desc: nextDesc
              };
            }
            return d;
          });
        } else if (sortAction === "remove") {
          newSorting = old.filter((d) => d.id !== column.id);
        } else {
          newSorting = [
            {
              id: column.id,
              desc: nextDesc
            }
          ];
        }
        return newSorting;
      });
    };
    column.getFirstSortDir = () => {
      const sortDescFirst = column.columnDef.sortDescFirst ?? table.options.sortDescFirst ?? column.getAutoSortDir() === "desc";
      return sortDescFirst ? "desc" : "asc";
    };
    column.getNextSortingOrder = (multi) => {
      const firstSortDirection = column.getFirstSortDir();
      const isSorted = column.getIsSorted();
      if (!isSorted) {
        return firstSortDirection;
      }
      if (isSorted !== firstSortDirection && (table.options.enableSortingRemoval ?? true) && // If enableSortRemove, enable in general
      (multi ? table.options.enableMultiRemove ?? true : true)) {
        return false;
      }
      return isSorted === "desc" ? "asc" : "desc";
    };
    column.getCanSort = () => {
      return (column.columnDef.enableSorting ?? true) && (table.options.enableSorting ?? true) && !!column.accessorFn;
    };
    column.getCanMultiSort = () => {
      return column.columnDef.enableMultiSort ?? table.options.enableMultiSort ?? !!column.accessorFn;
    };
    column.getIsSorted = () => {
      var _a;
      const columnSort = (_a = table.getState().sorting) == null ? void 0 : _a.find((d) => d.id === column.id);
      return !columnSort ? false : columnSort.desc ? "desc" : "asc";
    };
    column.getSortIndex = () => {
      var _a;
      return ((_a = table.getState().sorting) == null ? void 0 : _a.findIndex((d) => d.id === column.id)) ?? -1;
    };
    column.clearSorting = () => {
      table.setSorting(
        (old) => (old == null ? void 0 : old.length) ? old.filter((d) => d.id !== column.id) : []
      );
    };
    column.getToggleSortingHandler = () => {
      const canSort = column.getCanSort();
      return (e) => {
        var _a, _b, _c, _d;
        if (!canSort) return;
        (_a = e.persist) == null ? void 0 : _a.call(e);
        (_d = column.toggleSorting) == null ? void 0 : _d.call(
          column,
          void 0,
          column.getCanMultiSort() ? (_c = (_b = table.options).isMultiSortEvent) == null ? void 0 : _c.call(_b, e) : false
        );
      };
    };
  },
  _createTable: (table) => {
    table.setSorting = (updater) => {
      var _a, _b;
      return (_b = (_a = table.options).onSortingChange) == null ? void 0 : _b.call(_a, updater);
    };
    table.resetSorting = (defaultState) => {
      var _a;
      table.setSorting(defaultState ? [] : ((_a = table.initialState) == null ? void 0 : _a.sorting) ?? []);
    };
    table.getPreSortedRowModel = () => table.getGroupedRowModel();
    table.getSortedRowModel = () => {
      if (!table._getSortedRowModel && table.options.getSortedRowModel) {
        table._getSortedRowModel = table.options.getSortedRowModel(table);
      }
      if (table.options.manualSorting || !table._getSortedRowModel) {
        return table.getPreSortedRowModel();
      }
      return table._getSortedRowModel();
    };
  }
};

const builtInFeatures = [
  Headers,
  ColumnVisibility,
  ColumnOrdering,
  ColumnPinning,
  ColumnFaceting,
  ColumnFiltering,
  GlobalFaceting,
  //depends on ColumnFaceting
  GlobalFiltering,
  //depends on ColumnFiltering
  RowSorting,
  ColumnGrouping,
  //depends on RowSorting
  RowExpanding,
  RowPagination,
  RowPinning,
  RowSelection,
  ColumnSizing
];
function _createTable(options) {
  var _a;
  if (process.env.NODE_ENV !== "production" && (options.debugAll || options.debugTable)) {
    console.info("Creating Table Instance...");
  }
  const _features = [...builtInFeatures, ...options._features ?? []];
  let table = { _features };
  const defaultOptions = table._features.reduce((obj, feature) => {
    var _a2;
    return Object.assign(obj, (_a2 = feature._getDefaultOptions) == null ? void 0 : _a2.call(feature, table));
  }, {});
  const mergeOptions = (options2) => {
    if (table.options.mergeOptions) {
      return table.options.mergeOptions(defaultOptions, options2);
    }
    return {
      ...defaultOptions,
      ...options2
    };
  };
  const coreInitialState = {};
  let initialState = {
    ...coreInitialState,
    ...options.initialState ?? {}
  };
  table._features.forEach((feature) => {
    var _a2;
    initialState = ((_a2 = feature._getInitialState) == null ? void 0 : _a2.call(feature, initialState)) ?? initialState;
  });
  const queued = [];
  let queuedTimeout = false;
  const coreInstance = {
    _features,
    options: {
      ...defaultOptions,
      ...options
    },
    initialState,
    _queue: (cb) => {
      queued.push(cb);
      if (!queuedTimeout) {
        queuedTimeout = true;
        Promise.resolve().then(() => {
          while (queued.length) {
            queued.shift()();
          }
          queuedTimeout = false;
        }).catch(
          (error) => setTimeout(() => {
            throw error;
          })
        );
      }
    },
    reset: () => {
      table.setState(table.initialState);
    },
    setOptions: (updater) => {
      const newOptions = functionalUpdate(updater, table.options);
      table.options = mergeOptions(newOptions);
    },
    getState: () => {
      return table.options.state;
    },
    setState: (updater) => {
      var _a2, _b;
      (_b = (_a2 = table.options).onStateChange) == null ? void 0 : _b.call(_a2, updater);
    },
    _getRowId: (row, index, parent) => {
      var _a2, _b;
      return ((_b = (_a2 = table.options).getRowId) == null ? void 0 : _b.call(_a2, row, index, parent)) ?? `${parent ? [parent.id, index].join(".") : index}`;
    },
    getCoreRowModel: () => {
      if (!table._getCoreRowModel) {
        table._getCoreRowModel = table.options.getCoreRowModel(table);
      }
      return table._getCoreRowModel();
    },
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => {
      return table.getPaginationRowModel();
    },
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (id, searchAll) => {
      let row = (searchAll ? table.getPrePaginationRowModel() : table.getRowModel()).rowsById[id];
      if (!row) {
        row = table.getCoreRowModel().rowsById[id];
        if (!row) {
          if (process.env.NODE_ENV !== "production") {
            throw new Error(`getRow could not find row with ID: ${id}`);
          }
          throw new Error();
        }
      }
      return row;
    },
    _getDefaultColumnDef: memo$1(
      () => [table.options.defaultColumn],
      (defaultColumn) => {
        defaultColumn = defaultColumn ?? {};
        return {
          header: (props) => {
            const resolvedColumnDef = props.header.column.columnDef;
            if (resolvedColumnDef.accessorKey) {
              return resolvedColumnDef.accessorKey;
            }
            if (resolvedColumnDef.accessorFn) {
              return resolvedColumnDef.id;
            }
            return null;
          },
          // footer: props => props.header.column.id,
          cell: (props) => {
            var _a2, _b;
            return ((_b = (_a2 = props.renderValue()) == null ? void 0 : _a2.toString) == null ? void 0 : _b.call(_a2)) ?? null;
          },
          ...table._features.reduce((obj, feature) => {
            var _a2;
            return Object.assign(obj, (_a2 = feature._getDefaultColumnDef) == null ? void 0 : _a2.call(feature));
          }, {}),
          ...defaultColumn
        };
      },
      getMemoOptions(options, "debugColumns", "_getDefaultColumnDef")
    ),
    _getColumnDefs: () => table.options.columns,
    getAllColumns: memo$1(
      () => [table._getColumnDefs()],
      (columnDefs) => {
        const recurseColumns = (columnDefs2, parent, depth = 0) => {
          return columnDefs2.map((columnDef) => {
            const column = _createColumn(table, columnDef, depth, parent);
            const groupingColumnDef = columnDef;
            column.columns = groupingColumnDef.columns ? recurseColumns(groupingColumnDef.columns, column, depth + 1) : [];
            return column;
          });
        };
        return recurseColumns(columnDefs);
      },
      getMemoOptions(options, "debugColumns", "getAllColumns")
    ),
    getAllFlatColumns: memo$1(
      () => [table.getAllColumns()],
      (allColumns) => {
        return allColumns.flatMap((column) => {
          return column.getFlatColumns();
        });
      },
      getMemoOptions(options, "debugColumns", "getAllFlatColumns")
    ),
    _getAllFlatColumnsById: memo$1(
      () => [table.getAllFlatColumns()],
      (flatColumns) => {
        return flatColumns.reduce(
          (acc, column) => {
            acc[column.id] = column;
            return acc;
          },
          {}
        );
      },
      getMemoOptions(options, "debugColumns", "getAllFlatColumnsById")
    ),
    getAllLeafColumns: memo$1(
      () => [table.getAllColumns(), table._getOrderColumnsFn()],
      (allColumns, orderColumns) => {
        let leafColumns = allColumns.flatMap((column) => column.getLeafColumns());
        return orderColumns(leafColumns);
      },
      getMemoOptions(options, "debugColumns", "getAllLeafColumns")
    ),
    getColumn: (columnId) => {
      const column = table._getAllFlatColumnsById()[columnId];
      if (process.env.NODE_ENV !== "production" && !column) {
        console.error(`[Table] Column with id '${columnId}' does not exist.`);
      }
      return column;
    }
  };
  Object.assign(table, coreInstance);
  for (let index = 0; index < table._features.length; index++) {
    const feature = table._features[index];
    (_a = feature == null ? void 0 : feature._createTable) == null ? void 0 : _a.call(feature, table);
  }
  return table;
}

function getCoreRowModel() {
  return (table) => memo$1(
    () => [table.options.data],
    (data) => {
      const rowModel = {
        rows: [],
        flatRows: [],
        rowsById: {}
      };
      const accessRows = (originalRows, depth = 0, parentRow) => {
        var _a;
        const rows = [];
        for (let i = 0; i < originalRows.length; i++) {
          const row = _createRow(
            table,
            table._getRowId(originalRows[i], i, parentRow),
            originalRows[i],
            i,
            depth,
            void 0,
            parentRow == null ? void 0 : parentRow.id
          );
          rowModel.flatRows.push(row);
          rowModel.rowsById[row.id] = row;
          rows.push(row);
          if (table.options.getSubRows) {
            row.originalSubRows = table.options.getSubRows(
              originalRows[i],
              i
            );
            if ((_a = row.originalSubRows) == null ? void 0 : _a.length) {
              row.subRows = accessRows(row.originalSubRows, depth + 1, row);
            }
          }
        }
        return rows;
      };
      rowModel.rows = accessRows(data);
      return rowModel;
    },
    getMemoOptions(
      table.options,
      "debugTable",
      "getRowModel",
      () => table._autoResetPageIndex()
    )
  );
}

function getExpandedRowModel() {
  return (table) => memo$1(
    () => [
      table.getState().expanded,
      table.getPreExpandedRowModel(),
      table.options.paginateExpandedRows
    ],
    (expanded, rowModel, paginateExpandedRows) => {
      if (!rowModel.rows.length || expanded !== true && !Object.keys(expanded ?? {}).length) {
        return rowModel;
      }
      if (!paginateExpandedRows) {
        return rowModel;
      }
      return expandRows(rowModel);
    },
    getMemoOptions(table.options, "debugTable", "getExpandedRowModel")
  );
}
function expandRows(rowModel) {
  const expandedRows = [];
  const handleRow = (row) => {
    var _a;
    expandedRows.push(row);
    if (((_a = row.subRows) == null ? void 0 : _a.length) && row.getIsExpanded()) {
      row.subRows.forEach(handleRow);
    }
  };
  rowModel.rows.forEach(handleRow);
  return {
    rows: expandedRows,
    flatRows: rowModel.flatRows,
    rowsById: rowModel.rowsById
  };
}

function filterRows(rows, filterRowImpl, table) {
  if (table.options.filterFromLeafRows) {
    return filterRowModelFromLeafs(rows, filterRowImpl, table);
  }
  return filterRowModelFromRoot(rows, filterRowImpl, table);
}
function filterRowModelFromLeafs(rowsToFilter, filterRow, table) {
  const newFilteredFlatRows = [];
  const newFilteredRowsById = {};
  const maxDepth = table.options.maxLeafRowFilterDepth ?? 100;
  const recurseFilterRows = (rowsToFilter2, depth = 0) => {
    var _a;
    const rows = [];
    for (let i = 0; i < rowsToFilter2.length; i++) {
      let row = rowsToFilter2[i];
      const newRow = _createRow(
        table,
        row.id,
        row.original,
        row.index,
        row.depth,
        void 0,
        row.parentId
      );
      newRow.columnFilters = row.columnFilters;
      if (((_a = row.subRows) == null ? void 0 : _a.length) && depth < maxDepth) {
        newRow.subRows = recurseFilterRows(row.subRows, depth + 1);
        row = newRow;
        if (filterRow(row) && !newRow.subRows.length) {
          rows.push(row);
          newFilteredRowsById[row.id] = row;
          newFilteredFlatRows.push(row);
          continue;
        }
        if (filterRow(row) || newRow.subRows.length) {
          rows.push(row);
          newFilteredRowsById[row.id] = row;
          newFilteredFlatRows.push(row);
          continue;
        }
      } else {
        row = newRow;
        if (filterRow(row)) {
          rows.push(row);
          newFilteredRowsById[row.id] = row;
          newFilteredFlatRows.push(row);
        }
      }
    }
    return rows;
  };
  return {
    rows: recurseFilterRows(rowsToFilter),
    flatRows: newFilteredFlatRows,
    rowsById: newFilteredRowsById
  };
}
function filterRowModelFromRoot(rowsToFilter, filterRow, table) {
  const newFilteredFlatRows = [];
  const newFilteredRowsById = {};
  const maxDepth = table.options.maxLeafRowFilterDepth ?? 100;
  const recurseFilterRows = (rowsToFilter2, depth = 0) => {
    var _a;
    const rows = [];
    for (let i = 0; i < rowsToFilter2.length; i++) {
      let row = rowsToFilter2[i];
      const pass = filterRow(row);
      if (pass) {
        if (((_a = row.subRows) == null ? void 0 : _a.length) && depth < maxDepth) {
          const newRow = _createRow(
            table,
            row.id,
            row.original,
            row.index,
            row.depth,
            void 0,
            row.parentId
          );
          newRow.subRows = recurseFilterRows(row.subRows, depth + 1);
          row = newRow;
        }
        rows.push(row);
        newFilteredFlatRows.push(row);
        newFilteredRowsById[row.id] = row;
      }
    }
    return rows;
  };
  return {
    rows: recurseFilterRows(rowsToFilter),
    flatRows: newFilteredFlatRows,
    rowsById: newFilteredRowsById
  };
}

function getFilteredRowModel() {
  return (table) => memo$1(
    () => [
      table.getPreFilteredRowModel(),
      table.getState().columnFilters,
      table.getState().globalFilter
    ],
    (rowModel, columnFilters, globalFilter) => {
      if (!rowModel.rows.length || !(columnFilters == null ? void 0 : columnFilters.length) && !globalFilter) {
        for (let i = 0; i < rowModel.flatRows.length; i++) {
          rowModel.flatRows[i].columnFilters = {};
          rowModel.flatRows[i].columnFiltersMeta = {};
        }
        return rowModel;
      }
      const resolvedColumnFilters = [];
      const resolvedGlobalFilters = [];
      (columnFilters ?? []).forEach((d) => {
        var _a;
        const column = table.getColumn(d.id);
        if (!column) {
          return;
        }
        const filterFn = column.getFilterFn();
        if (!filterFn) {
          if (process.env.NODE_ENV !== "production") {
            console.warn(
              `Could not find a valid 'column.filterFn' for column with the ID: ${column.id}.`
            );
          }
          return;
        }
        resolvedColumnFilters.push({
          id: d.id,
          filterFn,
          resolvedValue: ((_a = filterFn.resolveFilterValue) == null ? void 0 : _a.call(filterFn, d.value)) ?? d.value
        });
      });
      const filterableIds = (columnFilters ?? []).map((d) => d.id);
      const globalFilterFn = table.getGlobalFilterFn();
      const globallyFilterableColumns = table.getAllLeafColumns().filter((column) => column.getCanGlobalFilter());
      if (globalFilter && globalFilterFn && globallyFilterableColumns.length) {
        filterableIds.push("__global__");
        globallyFilterableColumns.forEach((column) => {
          var _a;
          resolvedGlobalFilters.push({
            id: column.id,
            filterFn: globalFilterFn,
            resolvedValue: ((_a = globalFilterFn.resolveFilterValue) == null ? void 0 : _a.call(globalFilterFn, globalFilter)) ?? globalFilter
          });
        });
      }
      let currentColumnFilter;
      let currentGlobalFilter;
      for (let j = 0; j < rowModel.flatRows.length; j++) {
        const row = rowModel.flatRows[j];
        row.columnFilters = {};
        if (resolvedColumnFilters.length) {
          for (let i = 0; i < resolvedColumnFilters.length; i++) {
            currentColumnFilter = resolvedColumnFilters[i];
            const id = currentColumnFilter.id;
            row.columnFilters[id] = currentColumnFilter.filterFn(
              row,
              id,
              currentColumnFilter.resolvedValue,
              (filterMeta) => {
                row.columnFiltersMeta[id] = filterMeta;
              }
            );
          }
        }
        if (resolvedGlobalFilters.length) {
          for (let i = 0; i < resolvedGlobalFilters.length; i++) {
            currentGlobalFilter = resolvedGlobalFilters[i];
            const id = currentGlobalFilter.id;
            if (currentGlobalFilter.filterFn(
              row,
              id,
              currentGlobalFilter.resolvedValue,
              (filterMeta) => {
                row.columnFiltersMeta[id] = filterMeta;
              }
            )) {
              row.columnFilters.__global__ = true;
              break;
            }
          }
          if (row.columnFilters.__global__ !== true) {
            row.columnFilters.__global__ = false;
          }
        }
      }
      const filterRowsImpl = (row) => {
        for (let i = 0; i < filterableIds.length; i++) {
          if (row.columnFilters[filterableIds[i]] === false) {
            return false;
          }
        }
        return true;
      };
      return filterRows(rowModel.rows, filterRowsImpl, table);
    },
    getMemoOptions(
      table.options,
      "debugTable",
      "getFilteredRowModel",
      () => table._autoResetPageIndex()
    )
  );
}

function getSortedRowModel() {
  return (table) => memo$1(
    () => [table.getState().sorting, table.getPreSortedRowModel()],
    (sorting, rowModel) => {
      if (!rowModel.rows.length || !(sorting == null ? void 0 : sorting.length)) {
        return rowModel;
      }
      const sortingState = table.getState().sorting;
      const sortedFlatRows = [];
      const availableSorting = sortingState.filter(
        (sort) => {
          var _a;
          return (_a = table.getColumn(sort.id)) == null ? void 0 : _a.getCanSort();
        }
      );
      const columnInfoById = {};
      availableSorting.forEach((sortEntry) => {
        const column = table.getColumn(sortEntry.id);
        if (!column) return;
        columnInfoById[sortEntry.id] = {
          sortUndefined: column.columnDef.sortUndefined,
          invertSorting: column.columnDef.invertSorting,
          sortingFn: column.getSortingFn()
        };
      });
      const sortData = (rows) => {
        const sortedData = rows.map((row) => ({ ...row }));
        sortedData.sort((rowA, rowB) => {
          for (let i = 0; i < availableSorting.length; i += 1) {
            const sortEntry = availableSorting[i];
            const columnInfo = columnInfoById[sortEntry.id];
            const sortUndefined = columnInfo.sortUndefined;
            const isDesc = (sortEntry == null ? void 0 : sortEntry.desc) ?? false;
            let sortInt = 0;
            if (sortUndefined) {
              const aValue = rowA.getValue(sortEntry.id);
              const bValue = rowB.getValue(sortEntry.id);
              const aUndefined = aValue === void 0;
              const bUndefined = bValue === void 0;
              if (aUndefined || bUndefined) {
                if (sortUndefined === "first") return aUndefined ? -1 : 1;
                if (sortUndefined === "last") return aUndefined ? 1 : -1;
                sortInt = aUndefined && bUndefined ? 0 : aUndefined ? sortUndefined : -sortUndefined;
              }
            }
            if (sortInt === 0) {
              sortInt = columnInfo.sortingFn(rowA, rowB, sortEntry.id);
            }
            if (sortInt !== 0) {
              if (isDesc) {
                sortInt *= -1;
              }
              if (columnInfo.invertSorting) {
                sortInt *= -1;
              }
              return sortInt;
            }
          }
          return rowA.index - rowB.index;
        });
        sortedData.forEach((row) => {
          var _a;
          sortedFlatRows.push(row);
          if ((_a = row.subRows) == null ? void 0 : _a.length) {
            row.subRows = sortData(row.subRows);
          }
        });
        return sortedData;
      };
      return {
        rows: sortData(rowModel.rows),
        flatRows: sortedFlatRows,
        rowsById: rowModel.rowsById
      };
    },
    getMemoOptions(
      table.options,
      "debugTable",
      "getSortedRowModel",
      () => table._autoResetPageIndex()
    )
  );
}

function memo(getDeps, fn, opts) {
  let deps = opts.initialDeps ?? [];
  let result;
  function memoizedFunction() {
    var _a, _b, _c, _d;
    let depTime;
    if (opts.key && ((_a = opts.debug) == null ? void 0 : _a.call(opts))) depTime = Date.now();
    const newDeps = getDeps();
    const depsChanged = newDeps.length !== deps.length || newDeps.some((dep, index) => deps[index] !== dep);
    if (!depsChanged) {
      return result;
    }
    deps = newDeps;
    let resultTime;
    if (opts.key && ((_b = opts.debug) == null ? void 0 : _b.call(opts))) resultTime = Date.now();
    result = fn(...newDeps);
    if (opts.key && ((_c = opts.debug) == null ? void 0 : _c.call(opts))) {
      const depEndTime = Math.round((Date.now() - depTime) * 100) / 100;
      const resultEndTime = Math.round((Date.now() - resultTime) * 100) / 100;
      const resultFpsPercentage = resultEndTime / 16;
      const pad = (str, num) => {
        str = String(str);
        while (str.length < num) {
          str = " " + str;
        }
        return str;
      };
      console.info(
        `%c⏱ ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
          0,
          Math.min(120 - 120 * resultFpsPercentage, 120)
        )}deg 100% 31%);`,
        opts == null ? void 0 : opts.key
      );
    }
    (_d = opts == null ? void 0 : opts.onChange) == null ? void 0 : _d.call(opts, result);
    return result;
  }
  memoizedFunction.updateDeps = (newDeps) => {
    deps = newDeps;
  };
  return memoizedFunction;
}
function notUndefined(value, msg) {
  if (value === void 0) {
    throw new Error(`Unexpected undefined${""}`);
  } else {
    return value;
  }
}
const approxEqual = (a, b) => Math.abs(a - b) < 1.01;
const debounce = (targetWindow, fn, ms) => {
  let timeoutId;
  return function(...args) {
    targetWindow.clearTimeout(timeoutId);
    timeoutId = targetWindow.setTimeout(() => fn.apply(this, args), ms);
  };
};

const defaultKeyExtractor = (index) => index;
const defaultRangeExtractor = (range) => {
  const start = Math.max(range.startIndex - range.overscan, 0);
  const end = Math.min(range.endIndex + range.overscan, range.count - 1);
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
};
const addEventListenerOptions = {
  passive: true
};
const observeWindowRect = (instance, cb) => {
  const element = instance.scrollElement;
  if (!element) {
    return;
  }
  const handler = () => {
    cb({ width: element.innerWidth, height: element.innerHeight });
  };
  handler();
  element.addEventListener("resize", handler, addEventListenerOptions);
  return () => {
    element.removeEventListener("resize", handler);
  };
};
const supportsScrollend = typeof window == "undefined" ? true : "onscrollend" in window;
const observeWindowOffset = (instance, cb) => {
  const element = instance.scrollElement;
  if (!element) {
    return;
  }
  const targetWindow = instance.targetWindow;
  if (!targetWindow) {
    return;
  }
  let offset = 0;
  const fallback = instance.options.useScrollendEvent && supportsScrollend ? () => void 0 : debounce(
    targetWindow,
    () => {
      cb(offset, false);
    },
    instance.options.isScrollingResetDelay
  );
  const createHandler = (isScrolling) => () => {
    offset = element[instance.options.horizontal ? "scrollX" : "scrollY"];
    fallback();
    cb(offset, isScrolling);
  };
  const handler = createHandler(true);
  const endHandler = createHandler(false);
  endHandler();
  element.addEventListener("scroll", handler, addEventListenerOptions);
  const registerScrollendEvent = instance.options.useScrollendEvent && supportsScrollend;
  if (registerScrollendEvent) {
    element.addEventListener("scrollend", endHandler, addEventListenerOptions);
  }
  return () => {
    element.removeEventListener("scroll", handler);
    if (registerScrollendEvent) {
      element.removeEventListener("scrollend", endHandler);
    }
  };
};
const measureElement = (element, entry, instance) => {
  if (entry == null ? void 0 : entry.borderBoxSize) {
    const box = entry.borderBoxSize[0];
    if (box) {
      const size = Math.round(
        box[instance.options.horizontal ? "inlineSize" : "blockSize"]
      );
      return size;
    }
  }
  return element[instance.options.horizontal ? "offsetWidth" : "offsetHeight"];
};
const windowScroll = (offset, {
  adjustments = 0,
  behavior
}, instance) => {
  var _a, _b;
  const toOffset = offset + adjustments;
  (_b = (_a = instance.scrollElement) == null ? void 0 : _a.scrollTo) == null ? void 0 : _b.call(_a, {
    [instance.options.horizontal ? "left" : "top"]: toOffset,
    behavior
  });
};
class Virtualizer {
  constructor(opts) {
    this.unsubs = [];
    this.scrollElement = null;
    this.targetWindow = null;
    this.isScrolling = false;
    this.measurementsCache = [];
    this.itemSizeCache = /* @__PURE__ */ new Map();
    this.pendingMeasuredCacheIndexes = [];
    this.scrollRect = null;
    this.scrollOffset = null;
    this.scrollDirection = null;
    this.scrollAdjustments = 0;
    this.elementsCache = /* @__PURE__ */ new Map();
    this.observer = /* @__PURE__ */ (() => {
      let _ro = null;
      const get = () => {
        if (_ro) {
          return _ro;
        }
        if (!this.targetWindow || !this.targetWindow.ResizeObserver) {
          return null;
        }
        return _ro = new this.targetWindow.ResizeObserver((entries) => {
          entries.forEach((entry) => {
            const run = () => {
              this._measureElement(entry.target, entry);
            };
            this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(run) : run();
          });
        });
      };
      return {
        disconnect: () => {
          var _a;
          (_a = get()) == null ? void 0 : _a.disconnect();
          _ro = null;
        },
        observe: (target) => {
          var _a;
          return (_a = get()) == null ? void 0 : _a.observe(target, { box: "border-box" });
        },
        unobserve: (target) => {
          var _a;
          return (_a = get()) == null ? void 0 : _a.unobserve(target);
        }
      };
    })();
    this.range = null;
    this.setOptions = (opts2) => {
      Object.entries(opts2).forEach(([key, value]) => {
        if (typeof value === "undefined") delete opts2[key];
      });
      this.options = {
        debug: false,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: false,
        getItemKey: defaultKeyExtractor,
        rangeExtractor: defaultRangeExtractor,
        onChange: () => {
        },
        measureElement,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        isScrollingResetDelay: 150,
        enabled: true,
        isRtl: false,
        useScrollendEvent: false,
        useAnimationFrameWithResizeObserver: false,
        ...opts2
      };
    };
    this.notify = (sync) => {
      var _a, _b;
      (_b = (_a = this.options).onChange) == null ? void 0 : _b.call(_a, this, sync);
    };
    this.maybeNotify = memo(
      () => {
        this.calculateRange();
        return [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ];
      },
      (isScrolling) => {
        this.notify(isScrolling);
      },
      {
        key: process.env.NODE_ENV !== "production" && "maybeNotify",
        debug: () => this.options.debug,
        initialDeps: [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ]
      }
    );
    this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((d) => d());
      this.unsubs = [];
      this.observer.disconnect();
      this.scrollElement = null;
      this.targetWindow = null;
    };
    this._didMount = () => {
      return () => {
        this.cleanup();
      };
    };
    this._willUpdate = () => {
      var _a;
      const scrollElement = this.options.enabled ? this.options.getScrollElement() : null;
      if (this.scrollElement !== scrollElement) {
        this.cleanup();
        if (!scrollElement) {
          this.maybeNotify();
          return;
        }
        this.scrollElement = scrollElement;
        if (this.scrollElement && "ownerDocument" in this.scrollElement) {
          this.targetWindow = this.scrollElement.ownerDocument.defaultView;
        } else {
          this.targetWindow = ((_a = this.scrollElement) == null ? void 0 : _a.window) ?? null;
        }
        this.elementsCache.forEach((cached) => {
          this.observer.observe(cached);
        });
        this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        });
        this.unsubs.push(
          this.options.observeElementRect(this, (rect) => {
            this.scrollRect = rect;
            this.maybeNotify();
          })
        );
        this.unsubs.push(
          this.options.observeElementOffset(this, (offset, isScrolling) => {
            this.scrollAdjustments = 0;
            this.scrollDirection = isScrolling ? this.getScrollOffset() < offset ? "forward" : "backward" : null;
            this.scrollOffset = offset;
            this.isScrolling = isScrolling;
            this.maybeNotify();
          })
        );
      }
    };
    this.getSize = () => {
      if (!this.options.enabled) {
        this.scrollRect = null;
        return 0;
      }
      this.scrollRect = this.scrollRect ?? this.options.initialRect;
      return this.scrollRect[this.options.horizontal ? "width" : "height"];
    };
    this.getScrollOffset = () => {
      if (!this.options.enabled) {
        this.scrollOffset = null;
        return 0;
      }
      this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset === "function" ? this.options.initialOffset() : this.options.initialOffset);
      return this.scrollOffset;
    };
    this.getFurthestMeasurement = (measurements, index) => {
      const furthestMeasurementsFound = /* @__PURE__ */ new Map();
      const furthestMeasurements = /* @__PURE__ */ new Map();
      for (let m = index - 1; m >= 0; m--) {
        const measurement = measurements[m];
        if (furthestMeasurementsFound.has(measurement.lane)) {
          continue;
        }
        const previousFurthestMeasurement = furthestMeasurements.get(
          measurement.lane
        );
        if (previousFurthestMeasurement == null || measurement.end > previousFurthestMeasurement.end) {
          furthestMeasurements.set(measurement.lane, measurement);
        } else if (measurement.end < previousFurthestMeasurement.end) {
          furthestMeasurementsFound.set(measurement.lane, true);
        }
        if (furthestMeasurementsFound.size === this.options.lanes) {
          break;
        }
      }
      return furthestMeasurements.size === this.options.lanes ? Array.from(furthestMeasurements.values()).sort((a, b) => {
        if (a.end === b.end) {
          return a.index - b.index;
        }
        return a.end - b.end;
      })[0] : void 0;
    };
    this.getMeasurementOptions = memo(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled
      ],
      (count, paddingStart, scrollMargin, getItemKey, enabled) => {
        this.pendingMeasuredCacheIndexes = [];
        return {
          count,
          paddingStart,
          scrollMargin,
          getItemKey,
          enabled
        };
      },
      {
        key: false
      }
    );
    this.getMeasurements = memo(
      () => [this.getMeasurementOptions(), this.itemSizeCache],
      ({ count, paddingStart, scrollMargin, getItemKey, enabled }, itemSizeCache) => {
        if (!enabled) {
          this.measurementsCache = [];
          this.itemSizeCache.clear();
          return [];
        }
        if (this.measurementsCache.length === 0) {
          this.measurementsCache = this.options.initialMeasurementsCache;
          this.measurementsCache.forEach((item) => {
            this.itemSizeCache.set(item.key, item.size);
          });
        }
        const min = this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
        this.pendingMeasuredCacheIndexes = [];
        const measurements = this.measurementsCache.slice(0, min);
        for (let i = min; i < count; i++) {
          const key = getItemKey(i);
          const furthestMeasurement = this.options.lanes === 1 ? measurements[i - 1] : this.getFurthestMeasurement(measurements, i);
          const start = furthestMeasurement ? furthestMeasurement.end + this.options.gap : paddingStart + scrollMargin;
          const measuredSize = itemSizeCache.get(key);
          const size = typeof measuredSize === "number" ? measuredSize : this.options.estimateSize(i);
          const end = start + size;
          const lane = furthestMeasurement ? furthestMeasurement.lane : i % this.options.lanes;
          measurements[i] = {
            index: i,
            start,
            size,
            end,
            key,
            lane
          };
        }
        this.measurementsCache = measurements;
        return measurements;
      },
      {
        key: process.env.NODE_ENV !== "production" && "getMeasurements",
        debug: () => this.options.debug
      }
    );
    this.calculateRange = memo(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes
      ],
      (measurements, outerSize, scrollOffset, lanes) => {
        return this.range = measurements.length > 0 && outerSize > 0 ? calculateRange({
          measurements,
          outerSize,
          scrollOffset,
          lanes
        }) : null;
      },
      {
        key: process.env.NODE_ENV !== "production" && "calculateRange",
        debug: () => this.options.debug
      }
    );
    this.getVirtualIndexes = memo(
      () => {
        let startIndex = null;
        let endIndex = null;
        const range = this.calculateRange();
        if (range) {
          startIndex = range.startIndex;
          endIndex = range.endIndex;
        }
        this.maybeNotify.updateDeps([this.isScrolling, startIndex, endIndex]);
        return [
          this.options.rangeExtractor,
          this.options.overscan,
          this.options.count,
          startIndex,
          endIndex
        ];
      },
      (rangeExtractor, overscan, count, startIndex, endIndex) => {
        return startIndex === null || endIndex === null ? [] : rangeExtractor({
          startIndex,
          endIndex,
          overscan,
          count
        });
      },
      {
        key: process.env.NODE_ENV !== "production" && "getVirtualIndexes",
        debug: () => this.options.debug
      }
    );
    this.indexFromElement = (node) => {
      const attributeName = this.options.indexAttribute;
      const indexStr = node.getAttribute(attributeName);
      if (!indexStr) {
        console.warn(
          `Missing attribute name '${attributeName}={index}' on measured element.`
        );
        return -1;
      }
      return parseInt(indexStr, 10);
    };
    this._measureElement = (node, entry) => {
      const index = this.indexFromElement(node);
      const item = this.measurementsCache[index];
      if (!item) {
        return;
      }
      const key = item.key;
      const prevNode = this.elementsCache.get(key);
      if (prevNode !== node) {
        if (prevNode) {
          this.observer.unobserve(prevNode);
        }
        this.observer.observe(node);
        this.elementsCache.set(key, node);
      }
      if (node.isConnected) {
        this.resizeItem(index, this.options.measureElement(node, entry, this));
      }
    };
    this.resizeItem = (index, size) => {
      const item = this.measurementsCache[index];
      if (!item) {
        return;
      }
      const itemSize = this.itemSizeCache.get(item.key) ?? item.size;
      const delta = size - itemSize;
      if (delta !== 0) {
        if (this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(item, delta, this) : item.start < this.getScrollOffset() + this.scrollAdjustments) {
          if (process.env.NODE_ENV !== "production" && this.options.debug) {
            console.info("correction", delta);
          }
          this._scrollToOffset(this.getScrollOffset(), {
            adjustments: this.scrollAdjustments += delta,
            behavior: void 0
          });
        }
        this.pendingMeasuredCacheIndexes.push(item.index);
        this.itemSizeCache = new Map(this.itemSizeCache.set(item.key, size));
        this.notify(false);
      }
    };
    this.measureElement = (node) => {
      if (!node) {
        this.elementsCache.forEach((cached, key) => {
          if (!cached.isConnected) {
            this.observer.unobserve(cached);
            this.elementsCache.delete(key);
          }
        });
        return;
      }
      this._measureElement(node, void 0);
    };
    this.getVirtualItems = memo(
      () => [this.getVirtualIndexes(), this.getMeasurements()],
      (indexes, measurements) => {
        const virtualItems = [];
        for (let k = 0, len = indexes.length; k < len; k++) {
          const i = indexes[k];
          const measurement = measurements[i];
          virtualItems.push(measurement);
        }
        return virtualItems;
      },
      {
        key: process.env.NODE_ENV !== "production" && "getVirtualItems",
        debug: () => this.options.debug
      }
    );
    this.getVirtualItemForOffset = (offset) => {
      const measurements = this.getMeasurements();
      if (measurements.length === 0) {
        return void 0;
      }
      return notUndefined(
        measurements[findNearestBinarySearch(
          0,
          measurements.length - 1,
          (index) => notUndefined(measurements[index]).start,
          offset
        )]
      );
    };
    this.getOffsetForAlignment = (toOffset, align, itemSize = 0) => {
      const size = this.getSize();
      const scrollOffset = this.getScrollOffset();
      if (align === "auto") {
        align = toOffset >= scrollOffset + size ? "end" : "start";
      }
      if (align === "center") {
        toOffset += (itemSize - size) / 2;
      } else if (align === "end") {
        toOffset -= size;
      }
      const maxOffset = this.getTotalSize() + this.options.scrollMargin - size;
      return Math.max(Math.min(maxOffset, toOffset), 0);
    };
    this.getOffsetForIndex = (index, align = "auto") => {
      index = Math.max(0, Math.min(index, this.options.count - 1));
      const item = this.measurementsCache[index];
      if (!item) {
        return void 0;
      }
      const size = this.getSize();
      const scrollOffset = this.getScrollOffset();
      if (align === "auto") {
        if (item.end >= scrollOffset + size - this.options.scrollPaddingEnd) {
          align = "end";
        } else if (item.start <= scrollOffset + this.options.scrollPaddingStart) {
          align = "start";
        } else {
          return [scrollOffset, align];
        }
      }
      const toOffset = align === "end" ? item.end + this.options.scrollPaddingEnd : item.start - this.options.scrollPaddingStart;
      return [
        this.getOffsetForAlignment(toOffset, align, item.size),
        align
      ];
    };
    this.isDynamicMode = () => this.elementsCache.size > 0;
    this.scrollToOffset = (toOffset, { align = "start", behavior } = {}) => {
      if (behavior === "smooth" && this.isDynamicMode()) {
        console.warn(
          "The `smooth` scroll behavior is not fully supported with dynamic size."
        );
      }
      this._scrollToOffset(this.getOffsetForAlignment(toOffset, align), {
        adjustments: void 0,
        behavior
      });
    };
    this.scrollToIndex = (index, { align: initialAlign = "auto", behavior } = {}) => {
      if (behavior === "smooth" && this.isDynamicMode()) {
        console.warn(
          "The `smooth` scroll behavior is not fully supported with dynamic size."
        );
      }
      index = Math.max(0, Math.min(index, this.options.count - 1));
      let attempts = 0;
      const maxAttempts = 10;
      const tryScroll = (currentAlign) => {
        if (!this.targetWindow) return;
        const offsetInfo = this.getOffsetForIndex(index, currentAlign);
        if (!offsetInfo) {
          console.warn("Failed to get offset for index:", index);
          return;
        }
        const [offset, align] = offsetInfo;
        this._scrollToOffset(offset, { adjustments: void 0, behavior });
        this.targetWindow.requestAnimationFrame(() => {
          const currentOffset = this.getScrollOffset();
          const afterInfo = this.getOffsetForIndex(index, align);
          if (!afterInfo) {
            console.warn("Failed to get offset for index:", index);
            return;
          }
          if (!approxEqual(afterInfo[0], currentOffset)) {
            scheduleRetry(align);
          }
        });
      };
      const scheduleRetry = (align) => {
        if (!this.targetWindow) return;
        attempts++;
        if (attempts < maxAttempts) {
          if (process.env.NODE_ENV !== "production" && this.options.debug) {
            console.info("Schedule retry", attempts, maxAttempts);
          }
          this.targetWindow.requestAnimationFrame(() => tryScroll(align));
        } else {
          console.warn(
            `Failed to scroll to index ${index} after ${maxAttempts} attempts.`
          );
        }
      };
      tryScroll(initialAlign);
    };
    this.scrollBy = (delta, { behavior } = {}) => {
      if (behavior === "smooth" && this.isDynamicMode()) {
        console.warn(
          "The `smooth` scroll behavior is not fully supported with dynamic size."
        );
      }
      this._scrollToOffset(this.getScrollOffset() + delta, {
        adjustments: void 0,
        behavior
      });
    };
    this.getTotalSize = () => {
      var _a;
      const measurements = this.getMeasurements();
      let end;
      if (measurements.length === 0) {
        end = this.options.paddingStart;
      } else if (this.options.lanes === 1) {
        end = ((_a = measurements[measurements.length - 1]) == null ? void 0 : _a.end) ?? 0;
      } else {
        const endByLane = Array(this.options.lanes).fill(null);
        let endIndex = measurements.length - 1;
        while (endIndex >= 0 && endByLane.some((val) => val === null)) {
          const item = measurements[endIndex];
          if (endByLane[item.lane] === null) {
            endByLane[item.lane] = item.end;
          }
          endIndex--;
        }
        end = Math.max(...endByLane.filter((val) => val !== null));
      }
      return Math.max(
        end - this.options.scrollMargin + this.options.paddingEnd,
        0
      );
    };
    this._scrollToOffset = (offset, {
      adjustments,
      behavior
    }) => {
      this.options.scrollToFn(offset, { behavior, adjustments }, this);
    };
    this.measure = () => {
      this.itemSizeCache = /* @__PURE__ */ new Map();
      this.notify(false);
    };
    this.setOptions(opts);
  }
}
const findNearestBinarySearch = (low, high, getCurrentValue, value) => {
  while (low <= high) {
    const middle = (low + high) / 2 | 0;
    const currentValue = getCurrentValue(middle);
    if (currentValue < value) {
      low = middle + 1;
    } else if (currentValue > value) {
      high = middle - 1;
    } else {
      return middle;
    }
  }
  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
};
function calculateRange({
  measurements,
  outerSize,
  scrollOffset,
  lanes
}) {
  const lastIndex = measurements.length - 1;
  const getOffset = (index) => measurements[index].start;
  if (measurements.length <= lanes) {
    return {
      startIndex: 0,
      endIndex: lastIndex
    };
  }
  let startIndex = findNearestBinarySearch(
    0,
    lastIndex,
    getOffset,
    scrollOffset
  );
  let endIndex = startIndex;
  if (lanes === 1) {
    while (endIndex < lastIndex && measurements[endIndex].end < scrollOffset + outerSize) {
      endIndex++;
    }
  } else if (lanes > 1) {
    const endPerLane = Array(lanes).fill(0);
    while (endIndex < lastIndex && endPerLane.some((pos) => pos < scrollOffset + outerSize)) {
      const item = measurements[endIndex];
      endPerLane[item.lane] = item.end;
      endIndex++;
    }
    const startPerLane = Array(lanes).fill(scrollOffset + outerSize);
    while (startIndex >= 0 && startPerLane.some((pos) => pos >= scrollOffset)) {
      const item = measurements[startIndex];
      startPerLane[item.lane] = item.start;
      startIndex--;
    }
    startIndex = Math.max(0, startIndex - startIndex % lanes);
    endIndex = Math.min(lastIndex, endIndex + (lanes - 1 - endIndex % lanes));
  }
  return { startIndex, endIndex };
}

const empty = [];
function snapshot(value, skip_warning = false) {
  return clone(value, /* @__PURE__ */ new Map(), "", empty);
}
function clone(value, cloned, path, paths, original = null) {
  if (typeof value === "object" && value !== null) {
    var unwrapped = cloned.get(value);
    if (unwrapped !== void 0) return unwrapped;
    if (value instanceof Map) return (
      /** @type {Snapshot<T>} */
      new Map(value)
    );
    if (value instanceof Set) return (
      /** @type {Snapshot<T>} */
      new Set(value)
    );
    if (is_array(value)) {
      var copy = (
        /** @type {Snapshot<any>} */
        Array(value.length)
      );
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var i = 0; i < value.length; i += 1) {
        var element2 = value[i];
        if (i in value) {
          copy[i] = clone(element2, cloned, path, paths);
        }
      }
      return copy;
    }
    if (get_prototype_of(value) === object_prototype) {
      copy = {};
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var key in value) {
        copy[key] = clone(value[key], cloned, path, paths);
      }
      return copy;
    }
    if (value instanceof Date) {
      return (
        /** @type {Snapshot<T>} */
        structuredClone(value)
      );
    }
    if (typeof /** @type {T & { toJSON?: any } } */
    value.toJSON === "function") {
      return clone(
        /** @type {T & { toJSON(): any } } */
        value.toJSON(),
        cloned,
        path,
        paths,
        // Associate the instance with the toJSON clone
        value
      );
    }
  }
  if (value instanceof EventTarget) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
  try {
    return (
      /** @type {Snapshot<T>} */
      structuredClone(value)
    );
  } catch (e) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
}
class RenderComponentConfig {
  constructor(component, props) {
    this.component = component;
    this.props = props;
  }
}
function Flex_render($$payload, $$props) {
  push();
  let { content, context } = $$props;
  if (typeof content === "string") {
    $$payload.out += "<!--[-->";
    $$payload.out += `${escape_html(content)}`;
  } else if (content instanceof Function) {
    $$payload.out += "<!--[1-->";
    const result = content(context);
    if (result instanceof RenderComponentConfig) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      result.component?.($$payload, spread_props([result.props]));
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(result)}`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function createTable(options) {
  const resolvedOptions = mergeObjects(
    {
      state: {},
      onStateChange() {
      },
      renderFallbackValue: null,
      mergeOptions: (defaultOptions, options2) => {
        return mergeObjects(defaultOptions, options2);
      }
    },
    options
  );
  const table = _createTable(resolvedOptions);
  let state = table.initialState;
  function updateOptions() {
    table.setOptions((prev) => {
      return mergeObjects(prev, options, {
        state: mergeObjects(state, options.state || {}),
        onStateChange: (updater) => {
          if (updater instanceof Function) state = updater(state);
          else state = mergeObjects(state, updater);
          options.onStateChange?.(updater);
        }
      });
    });
  }
  updateOptions();
  return table;
}
function mergeObjects(...sources) {
  const target = {};
  for (let i = 0; i < sources.length; i++) {
    let source = sources[i];
    if (typeof source === "function") source = source();
    if (source) {
      const descriptors = Object.getOwnPropertyDescriptors(source);
      for (const key in descriptors) {
        if (key in target) continue;
        Object.defineProperty(target, key, {
          enumerable: true,
          get() {
            for (let i2 = sources.length - 1; i2 >= 0; i2--) {
              let v, s = sources[i2];
              if (typeof s === "function") s = s();
              v = (s || {})[key];
              if (v !== void 0) return v;
            }
          }
        });
      }
    }
  }
  return target;
}
function createVirtualizerBase(initialOptions) {
  const virtualizer = new Virtualizer(initialOptions);
  const originalSetOptions = virtualizer.setOptions;
  let virtualizerWritable;
  const setOptions = (options) => {
    const resolvedOptions = {
      ...virtualizer.options,
      ...options,
      onChange: options.onChange
    };
    originalSetOptions({
      ...resolvedOptions,
      onChange: (instance, sync) => {
        virtualizerWritable.set(instance);
        resolvedOptions.onChange?.(instance, sync);
      }
    });
    virtualizer._willUpdate();
  };
  virtualizerWritable = writable(virtualizer, () => {
    setOptions(initialOptions);
    return virtualizer._didMount();
  });
  return derived(virtualizerWritable, (instance) => Object.assign(instance, { setOptions }));
}
function createWindowVirtualizer(options) {
  return createVirtualizerBase({
    getScrollElement: () => typeof document !== "undefined" ? window : null,
    observeElementRect: observeWindowRect,
    observeElementOffset: observeWindowOffset,
    scrollToFn: windowScroll,
    initialOffset: () => typeof document !== "undefined" ? window.scrollY : 0,
    ...options
  });
}
function TableColumnVisibilityToggle($$payload, $$props) {
  push();
  let { columnVisibility, allColumns } = $$props;
  const each_array = ensure_array_like(allColumns);
  $$payload.out += `<div class="dropdown dropdown-end"><div tabindex="0" role="button" class="btn btn-sm btn-outline"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Columns</div> <div class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><div class="form-control"><label class="label cursor-pointer"><span class="label-text font-medium">Toggle All</span> <input type="checkbox" class="toggle toggle-sm"${attr("checked", allColumns.every((col) => columnVisibility[col.id] !== false), true)}/></label></div> <div class="divider my-1"></div> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let column = each_array[$$index];
    $$payload.out += `<div class="form-control"><label class="label cursor-pointer"><span class="label-text text-sm">${escape_html(column.header)}</span> <input type="checkbox" class="checkbox checkbox-sm"${attr("checked", columnVisibility[column.id] !== false, true)}/></label></div>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}
function getScoreColor(score) {
  if (score >= SCORE_THRESHOLDS.HIGH_CONCERN) {
    return "badge-error";
  } else if (score >= SCORE_THRESHOLDS.MEDIUM_CONCERN) {
    return "badge-warning";
  } else if (score >= SCORE_THRESHOLDS.LOW_CONCERN) {
    return "badge-info";
  } else if (score >= SCORE_THRESHOLDS.MINIMAL_CONCERN) {
    return "badge-neutral";
  } else {
    return "badge-ghost";
  }
}
function TableCell($$payload, $$props) {
  push();
  let {
    cell,
    row,
    rowData,
    cellWidth,
    isFolder,
    transcriptUrl = null,
    isGridCell = false,
    virtualItemSize = void 0,
    virtualItemTransform = void 0
  } = $$props;
  let isToggling = false;
  if (cell.column.id === "id" && isFolder) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex items-center gap-2"><button class="flex items-center gap-1 hover:text-primary"${attr("disabled", isToggling, true)}><svg${attr_class(`w-4 h-4 transition-transform ${stringify(row.getIsExpanded() ? "rotate-90" : "")} flex-shrink-0`)} fill="none" stroke="currentColor" viewBox="0 0 24 24"${attr("data-row-id", row.id)}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg> <svg class="w-4 h-4 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path></svg> <span class="break-words">`;
    Flex_render($$payload, {
      content: cell.column.columnDef.cell,
      context: cell.getContext()
    });
    $$payload.out += `<!----></span></button></div>`;
  } else if (!isFolder) {
    $$payload.out += "<!--[1-->";
    const cellElement = isGridCell ? "div" : "td";
    const baseClasses = isGridCell ? "px-3 py-3 overflow-x-auto overflow-y-hidden table-cell-no-scrollbar border-b border-base-200 flex items-center min-h-[60px]" : "px-3 py-3 overflow-x-auto overflow-y-hidden table-cell-no-scrollbar";
    const cellStyle = isGridCell ? `${virtualItemSize ? `height: ${virtualItemSize}px;` : ""} ${virtualItemTransform ? `transform: ${virtualItemTransform};` : ""}` : `width: ${cellWidth}px; min-width: ${cellWidth}px;`;
    if (cell.column.id === "id") {
      $$payload.out += "<!--[-->";
      element(
        $$payload,
        cellElement,
        () => {
          $$payload.out += `${attr_class(`font-mono text-sm ${stringify(baseClasses)}`)}${attr_style(`${stringify(cellStyle)} ${stringify(!isFolder ? `padding-left: ${row.depth * 20 + 12}px;` : "")}`)}`;
        },
        () => {
          $$payload.out += `<span class="break-words">`;
          Flex_render($$payload, {
            content: cell.column.columnDef.cell,
            context: cell.getContext()
          });
          $$payload.out += `<!----></span>`;
        }
      );
    } else if (cell.column.id === "summary") {
      $$payload.out += "<!--[1-->";
      element(
        $$payload,
        cellElement,
        () => {
          $$payload.out += `${attr_class(baseClasses)}${attr_style(cellStyle)}`;
        },
        () => {
          $$payload.out += `<span class="break-words text-sm text-base-content/80">`;
          Flex_render($$payload, {
            content: cell.column.columnDef.cell,
            context: cell.getContext()
          });
          $$payload.out += `<!----></span>`;
        }
      );
    } else if (cell.column.id === "tags") {
      $$payload.out += "<!--[2-->";
      element(
        $$payload,
        cellElement,
        () => {
          $$payload.out += `${attr_class(baseClasses)}${attr_style(cellStyle)}`;
        },
        () => {
          if (rowData.tags && rowData.tags.length > 0) {
            $$payload.out += "<!--[-->";
            const each_array = ensure_array_like(rowData.tags);
            $$payload.out += `<div class="flex flex-wrap gap-1"><!--[-->`;
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let tag = each_array[$$index];
              $$payload.out += `<span class="badge badge-outline badge-sm">${escape_html(tag)}</span>`;
            }
            $$payload.out += `<!--]--></div>`;
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `<span class="text-base-content/50">—</span>`;
          }
          $$payload.out += `<!--]-->`;
        }
      );
    } else if (cell.column.id.startsWith("score_") || cell.column.id === "concerningScore") {
      $$payload.out += "<!--[3-->";
      const cellValue = cell.getValue();
      element(
        $$payload,
        cellElement,
        () => {
          $$payload.out += `${attr_class(`text-center ${stringify(baseClasses)}`)}${attr_style(cellStyle)}`;
        },
        () => {
          if (cellValue !== null && cellValue !== void 0 && cellValue !== "—") {
            $$payload.out += "<!--[-->";
            const score = typeof cellValue === "string" ? parseFloat(cellValue) : cellValue;
            if (!isNaN(score)) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<span${attr_class(`badge ${stringify(getScoreColor(score))} badge-sm font-mono break-words`)}>${escape_html(score)}/10</span>`;
            } else {
              $$payload.out += "<!--[!-->";
              $$payload.out += `<span class="text-base-content/50 break-words">—</span>`;
            }
            $$payload.out += `<!--]-->`;
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `<span class="text-base-content/50 break-words">—</span>`;
          }
          $$payload.out += `<!--]-->`;
        }
      );
    } else {
      $$payload.out += "<!--[!-->";
      element(
        $$payload,
        cellElement,
        () => {
          $$payload.out += `${attr_class(baseClasses)}${attr_style(cellStyle)}`;
        },
        () => {
          $$payload.out += `<span class="break-words">`;
          Flex_render($$payload, {
            content: cell.column.columnDef.cell,
            context: cell.getContext()
          });
          $$payload.out += `<!----></span>`;
        }
      );
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function ScoreHeader($$payload, $$props) {
  let { title, tooltip } = $$props;
  if (tooltip) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="tooltip tooltip-bottom"${attr("data-tip", tooltip)}><span class="cursor-help">${escape_html(title)}</span></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span>${escape_html(title)}</span>`;
  }
  $$payload.out += `<!--]-->`;
}
function calculateIdColumnWidth(data) {
  let maxWidth = 100;
  const baseIndentation = 12;
  const depthIndentation = 20;
  const charWidth = 8;
  const padding = 24;
  function measureContent(rows, depth = 0) {
    for (const row of rows) {
      let contentLength = 0;
      if (row.type === "folder") {
        contentLength = (row.name || "Folder").length;
      } else {
        const idPart = row.id ? String(row.id).split("_").pop() : "";
        contentLength = idPart ? `#${idPart}`.length : 0;
      }
      const indentationWidth = baseIndentation + depth * depthIndentation;
      const totalWidth = contentLength * charWidth + indentationWidth + padding;
      maxWidth = Math.max(maxWidth, totalWidth);
      if (row.subRows && row.subRows.length > 0) {
        measureContent(row.subRows, depth + 1);
      }
    }
  }
  measureContent(data);
  const finalWidth = Math.min(maxWidth, 400);
  console.log("📏 [DEBUG] ID column width calculation:", {
    calculatedWidth: maxWidth,
    finalWidth,
    dataLength: data.length
  });
  return finalWidth;
}
function createColumns(scoreTypes, data = [], scoreDescriptions = {}) {
  const idColumnWidth = calculateIdColumnWidth(data);
  const baseColumns = [
    {
      id: "id",
      accessorKey: "id",
      header: "ID",
      cell: ({ row, getValue }) => {
        const value = getValue();
        const isFolder = row.original.type === "folder";
        if (isFolder) {
          return row.original.name || "Folder";
        }
        return value ? `#${String(value).split("_").pop()}` : "";
      },
      enableSorting: true,
      enableResizing: true,
      size: idColumnWidth,
      minSize: 100
    },
    {
      id: "model",
      accessorKey: "model",
      header: "Model",
      cell: ({ row, getValue }) => {
        if (row.original.type === "folder") return "";
        return getValue();
      },
      enableSorting: true,
      enableResizing: true,
      size: 150,
      minSize: 70
    },
    {
      id: "tags",
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => {
        if (row.original.type === "folder") return "";
        const tags = row.original.tags || [];
        return tags.join(", ");
      },
      filterFn: (row, _columnId, value) => {
        if (row.original.type === "folder") return true;
        const selected = Array.isArray(value) ? value : [];
        if (!selected || selected.length === 0) return true;
        const rowTags = Array.isArray(row.original.tags) ? row.original.tags : [];
        return selected.some((t) => rowTags.includes(t));
      },
      enableSorting: false,
      enableResizing: true,
      size: 220,
      minSize: 120
    },
    {
      id: "summary",
      accessorKey: "summary",
      header: "Summary",
      cell: ({ row, getValue }) => {
        if (row.original.type === "folder") return "";
        const summary = getValue();
        return summary ? summary.length > 150 ? summary.slice(0, 150) + "..." : summary : "";
      },
      enableSorting: false,
      enableResizing: true,
      size: 400,
      minSize: 120
    }
  ];
  const scoreColumns = scoreTypes.map((scoreType) => {
    const formattedHeader = scoreType.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    const description = scoreDescriptions[scoreType];
    const tooltipText = description ? extractFirstSentence(description) : void 0;
    return {
      id: `score_${scoreType}`,
      accessorFn: (row) => row.scores?.[scoreType],
      header: formattedHeader,
      meta: {
        tooltip: tooltipText
        // Store tooltip in meta for custom rendering
      },
      cell: ({ row, getValue }) => {
        if (row.original.type === "folder") return "";
        const score = getValue();
        return score !== void 0 ? `${score}/10` : "";
      },
      enableSorting: true,
      enableResizing: true,
      size: 120,
      minSize: 50
    };
  });
  return [...baseColumns, ...scoreColumns];
}
function getAllColumnInfo(scoreTypes) {
  return [
    { id: "id", header: "ID" },
    { id: "model", header: "Model" },
    { id: "tags", header: "Tags" },
    { id: "split", header: "Split" },
    { id: "concerningScore", header: "Concerning Score" },
    { id: "summary", header: "Summary" },
    { id: "judgeSummary", header: "Judge Summary" },
    ...scoreTypes.map((scoreType) => ({
      id: `score_${scoreType}`,
      header: scoreType.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    }))
  ];
}
function transcriptToTableRow(transcript) {
  return {
    id: transcript.id,
    name: transcript.summary.substring(0, 50) + (transcript.summary.length > 50 ? "..." : ""),
    path: transcript.id,
    // Use ID as path for transcripts
    type: "transcript",
    // Use consistent 'transcript' type
    model: transcript.model,
    split: transcript.split,
    summary: transcript.summary,
    scores: transcript.scores,
    concerningScore: transcript.concerningScore,
    judgeSummary: transcript.judgeSummary,
    justification: transcript.justification,
    tags: transcript.tags,
    originalTranscript: transcript
  };
}
function folderTreeToTableRows(folderTree) {
  return folderTree;
}
function transcriptsToTableRows(transcripts) {
  return transcripts.map(transcriptToTableRow);
}
function TagsFilterHeader($$payload, $$props) {
  push();
  let { column, allTags = [] } = $$props;
  let selectedTags = (() => {
    const v = column?.getFilterValue?.();
    return Array.isArray(v) ? v : [];
  })();
  let availableTags = (() => {
    const selected = new Set(selectedTags || []);
    return (allTags || []).filter((t) => !selected.has(t));
  })();
  const each_array = ensure_array_like(selectedTags || []);
  $$payload.out += `<div class="flex items-center gap-2 w-full"><span class="text-sm font-medium whitespace-nowrap">Tags</span> <div class="flex-1 min-w-0"><div class="flex flex-wrap gap-1"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let tag = each_array[$$index];
    $$payload.out += `<span class="badge badge-outline gap-1"><button class="btn btn-ghost btn-xs px-1" aria-label="Remove tag">✕</button> <span>${escape_html(tag)}</span></span>`;
  }
  $$payload.out += `<!--]--> `;
  if (!selectedTags || selectedTags.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="text-xs text-base-content/50">No filter</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> <div class="dropdown dropdown-end"><div tabindex="0" role="button" class="btn btn-xs" aria-haspopup="listbox">Add</div> <ul tabindex="-1" role="listbox" class="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-56 max-h-60 overflow-auto">`;
  if (availableTags.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<li class="text-xs text-base-content/50 px-2 py-1">No more tags</li>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array_1 = ensure_array_like(availableTags);
    $$payload.out += `<!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let tag = each_array_1[$$index_1];
      $$payload.out += `<li><button class="text-sm" role="option" aria-selected="false">${escape_html(tag)}</button></li>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--> <li class="mt-1"><button class="btn btn-ghost btn-xs w-full">Clear</button></li></ul></div></div>`;
  pop();
}
function TranscriptTable($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    transcripts = [],
    folderTree = [],
    scoreTypes = [],
    scoreDescriptions = {},
    viewMode = "list",
    currentPath = null
  } = $$props;
  (() => {
    if (viewMode === "list") {
      const data = transcriptsToTableRows(transcripts);
      return data;
    } else {
      const data = folderTreeToTableRows(folderTree);
      return data;
    }
  })();
  let expanded = {};
  const handleExpandedChange = (updaterOrValue) => {
    console.log("🔄 [DEBUG] onExpandedChange called with:", typeof updaterOrValue);
    let newExpanded;
    if (typeof updaterOrValue === "function") {
      newExpanded = updaterOrValue(expanded);
    } else {
      newExpanded = updaterOrValue;
    }
    console.log("🔍 [DEBUG] Expanded state changing from:", snapshot(expanded), "to:", snapshot(newExpanded));
    expanded = newExpanded;
  };
  let columnSizing = {};
  const handleColumnSizingChange = (updaterOrValue) => {
    console.log("📏 [DEBUG] onColumnSizingChange called with:", typeof updaterOrValue);
    let newColumnSizing;
    if (typeof updaterOrValue === "function") {
      newColumnSizing = updaterOrValue(columnSizing);
    } else {
      newColumnSizing = updaterOrValue;
    }
    console.log("📏 [DEBUG] Column sizing changing from:", snapshot(columnSizing), "to:", snapshot(newColumnSizing));
    columnSizing = newColumnSizing;
  };
  let sorting = [];
  let columnFilters = [];
  const handleSortingChange = (updaterOrValue) => {
    const previous = sorting;
    const nextValue = updaterOrValue instanceof Function ? updaterOrValue(sorting) : updaterOrValue;
    console.log("🔀 [DEBUG] onSortingChange:", {
      updaterType: typeof updaterOrValue,
      previous,
      next: nextValue
    });
    sorting = nextValue;
  };
  const handleColumnFiltersChange = (updaterOrValue) => {
    let newFilters;
    if (typeof updaterOrValue === "function") {
      newFilters = updaterOrValue(columnFilters);
    } else {
      newFilters = updaterOrValue;
    }
    columnFilters = newFilters;
  };
  let options = writable({
    data: [],
    columns: createColumns(scoreTypes || [], [], scoreDescriptions || {}),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.subRows,
    getRowCanExpand: (row) => {
      const canExpand = row.original.type === "folder" && (row.original.subRows?.length || 0) > 0;
      if (row.original.type === "folder") {
        console.log("🔍 [DEBUG] getRowCanExpand check:", {
          id: row.id,
          depth: row.depth,
          name: row.original.name,
          hasSubRows: !!row.original.subRows?.length,
          subRowsCount: row.original.subRows?.length || 0,
          canExpand
        });
      }
      return canExpand;
    },
    getRowId: (row) => row.path || row.id,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    enableSorting: true,
    enableMultiSort: true,
    enableExpanding: true,
    // Initialize with empty controlled state; keep in sync via $effect below
    state: {
      expanded: {},
      columnSizing: {},
      sorting: [],
      columnFilters: []
    },
    onExpandedChange: handleExpandedChange,
    onColumnSizingChange: handleColumnSizingChange,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange
  });
  let table = createTable(store_get($$store_subs ??= {}, "$options", options));
  let scrollMarginValue = 0;
  let virtualizer = (() => {
    const rows = table.getRowModel().rows;
    return createWindowVirtualizer({
      count: rows.length,
      estimateSize: (index) => rows[index]?.original?.type === "folder" ? 40 : 60,
      gap: 2,
      overscan: 10,
      scrollMargin: scrollMarginValue
    });
  })();
  let columnWidths = (() => {
    const widths = table.getVisibleLeafColumns().map((column) => column.getSize());
    return widths;
  })();
  let allTags = (() => {
    const set = /* @__PURE__ */ new Set();
    (transcripts || []).forEach((t) => {
      if (Array.isArray(t.tags)) {
        for (const tag of t.tags) {
          if (tag && typeof tag === "string") set.add(tag);
        }
      }
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  })();
  let totalTableWidth = (() => {
    return columnWidths.reduce((sum, width) => sum + width, 0);
  })();
  function getTranscriptUrl(rowData) {
    if (rowData.type === "transcript" && rowData.originalTranscript && rowData.originalTranscript._filePath) {
      const norm = normalizeClientFilePath(rowData.originalTranscript._filePath);
      if (!norm) return null;
      const prefixed = currentPath ? `${currentPath}/${norm}` : norm;
      return buildTranscriptUrl(prefixed);
    }
    return null;
  }
  let allColumnInfo = getAllColumnInfo(scoreTypes);
  const each_array = ensure_array_like(table.getHeaderGroups());
  $$payload.out += `<div class="w-full"><div class="flex justify-between items-center mb-4"><div class="flex items-center gap-2"><span class="text-sm text-base-content/70">${escape_html(table.getRowModel().rows.length)} ${escape_html(viewMode === "tree" ? "items" : "transcripts")}</span></div> <div class="flex items-center gap-2">`;
  TableColumnVisibilityToggle($$payload, {
    columnVisibility: table.getState().columnVisibility,
    allColumns: allColumnInfo
  });
  $$payload.out += `<!----></div></div> <div class="border border-base-300 rounded-lg overflow-hidden"><div class="w-full overflow-x-auto"><div class="relative"${attr_style(`min-width: ${stringify(totalTableWidth)}px;`)}><div class="sticky top-0 bg-base-200 z-20 border-b border-base-300"><div class="w-full"${attr_style(` display: grid; grid-template-columns: ${stringify(columnWidths.map((width) => `${width}px`).join(" "))}; min-width: ${stringify(totalTableWidth)}px; `)}><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let headerGroup = each_array[$$index_1];
    const each_array_1 = ensure_array_like(headerGroup.headers);
    $$payload.out += `<!--[-->`;
    for (let headerIndex = 0, $$length2 = each_array_1.length; headerIndex < $$length2; headerIndex++) {
      let header = each_array_1[headerIndex];
      columnWidths[headerIndex] || 150;
      $$payload.out += `<div class="px-3 py-3 text-left bg-base-200 flex items-center justify-between h-12" style="position: relative;">`;
      if (!header.isPlaceholder) {
        $$payload.out += "<!--[-->";
        if (header.column.id === "tags") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="flex items-center gap-2 overflow-hidden h-full w-full">`;
          TagsFilterHeader($$payload, { column: header.column, allTags });
          $$payload.out += `<!----></div>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<div class="flex items-center gap-2 overflow-hidden h-full w-full"><button${attr_class(`flex items-center gap-2 hover:text-primary ${stringify(header.column.getCanSort() ? "cursor-pointer" : "")} text-sm font-medium whitespace-nowrap`)}${attr("disabled", !header.column.getCanSort(), true)} type="button">`;
          if (header.column.getCanSort()) {
            $$payload.out += "<!--[-->";
            if (header.column.getIsSorted() === "asc") {
              $$payload.out += "<!--[-->";
              $$payload.out += `<svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>`;
            } else if (header.column.getIsSorted() === "desc") {
              $$payload.out += "<!--[1-->";
              $$payload.out += `<svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;
            } else {
              $$payload.out += "<!--[!-->";
              $$payload.out += `<svg class="w-3 h-3 opacity-50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>`;
            }
            $$payload.out += `<!--]-->`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--> `;
          if (header.column.id.startsWith("score_") && header.column.columnDef.meta?.tooltip) {
            $$payload.out += "<!--[-->";
            ScoreHeader($$payload, {
              title: String(header.column.columnDef.header),
              tooltip: header.column.columnDef.meta.tooltip
            });
          } else {
            $$payload.out += "<!--[!-->";
            Flex_render($$payload, {
              content: header.column.columnDef.header,
              context: header.getContext()
            });
          }
          $$payload.out += `<!--]--></button></div>`;
        }
        $$payload.out += `<!--]--> `;
        if (header.column.getCanResize()) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<button class="absolute top-2 right-0 w-1 h-8 cursor-col-resize bg-base-300/60 hover:bg-primary/70 transition-colors border-0 p-0 rounded-sm" style="user-select: none; touch-action: none;" aria-label="Resize column" type="button"></button>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div></div> <div class="relative"${attr_style(`height: ${stringify(virtualizer ? store_get($$store_subs ??= {}, "$virtualizer", virtualizer).getTotalSize() : 0)}px; min-width: ${stringify(totalTableWidth)}px;`)}>`;
  if (virtualizer) {
    $$payload.out += "<!--[-->";
    const each_array_2 = ensure_array_like(store_get($$store_subs ??= {}, "$virtualizer", virtualizer)?.getVirtualItems() || []);
    $$payload.out += `<!--[-->`;
    for (let $$index_4 = 0, $$length = each_array_2.length; $$index_4 < $$length; $$index_4++) {
      let virtualItem = each_array_2[$$index_4];
      const row = table.getRowModel().rows[virtualItem.index];
      const rowData = row.original;
      const isFolder = rowData.type === "folder";
      const transcriptUrl = !isFolder && rowData.originalTranscript ? getTranscriptUrl(rowData) : null;
      if (isFolder) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="absolute hover:bg-base-200/50 bg-base-100 font-medium border-b border-base-200 flex items-center px-3 py-2"${attr_style(` top: ${stringify(virtualItem.start - scrollMarginValue)}px; height: 40px; width: ${stringify(totalTableWidth)}px; min-width: ${stringify(totalTableWidth)}px; padding-left: ${stringify(row.depth * 20 + 12)}px; `)}>`;
        TableCell($$payload, {
          cell: row.getVisibleCells()[0],
          row,
          rowData,
          cellWidth: totalTableWidth,
          isFolder,
          transcriptUrl
        });
        $$payload.out += `<!----></div>`;
      } else if (transcriptUrl) {
        $$payload.out += "<!--[1-->";
        const each_array_3 = ensure_array_like(row.getVisibleCells());
        $$payload.out += `<a${attr("href", transcriptUrl)} class="absolute hover:bg-base-200/50 block"${attr_style(` top: ${stringify(virtualItem.start - scrollMarginValue)}px; height: ${stringify(virtualItem.size)}px; width: ${stringify(totalTableWidth)}px; min-width: ${stringify(totalTableWidth)}px; `)}><div class="w-full h-full"${attr_style(` display: grid; grid-template-columns: ${stringify(columnWidths.map((width) => `${width}px`).join(" "))}; min-width: ${stringify(totalTableWidth)}px; `)}><!--[-->`;
        for (let cellIndex = 0, $$length2 = each_array_3.length; cellIndex < $$length2; cellIndex++) {
          let cell = each_array_3[cellIndex];
          const cellWidth = columnWidths[cellIndex] || 150;
          TableCell($$payload, {
            cell,
            row,
            rowData,
            cellWidth,
            isFolder,
            transcriptUrl,
            isGridCell: true
          });
        }
        $$payload.out += `<!--]--></div></a>`;
      } else {
        $$payload.out += "<!--[!-->";
        const each_array_4 = ensure_array_like(row.getVisibleCells());
        $$payload.out += `<div class="absolute"${attr_style(` top: ${stringify(virtualItem.start - scrollMarginValue)}px; height: ${stringify(virtualItem.size)}px; width: ${stringify(totalTableWidth)}px; min-width: ${stringify(totalTableWidth)}px; display: grid; grid-template-columns: ${stringify(columnWidths.map((width) => `${width}px`).join(" "))}; `)}><!--[-->`;
        for (let cellIndex = 0, $$length2 = each_array_4.length; cellIndex < $$length2; cellIndex++) {
          let cell = each_array_4[cellIndex];
          const cellWidth = columnWidths[cellIndex] || 150;
          TableCell($$payload, {
            cell,
            row,
            rowData,
            cellWidth,
            isFolder,
            transcriptUrl,
            isGridCell: true
          });
        }
        $$payload.out += `<!--]--></div>`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="p-4 text-center text-base-content/70">Loading table...</div>`;
  }
  $$payload.out += `<!--]--></div></div></div></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
class LocalStore {
  value;
  key = "";
  initialized = false;
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  // Initialize the effect - call this from within a component
  init() {
    if (this.initialized || true) return;
  }
  serialize(value) {
    return JSON.stringify(value);
  }
  deserialize(item) {
    return JSON.parse(item);
  }
}
const filterState = new LocalStore("homepage-filters", {
  filterExpression: "",
  searchQuery: ""
});
const viewSettings = new LocalStore("homepage-view", {
  viewMode: "tree"
});
function createFilterFunction(expression) {
  if (!expression || !expression.trim()) {
    return () => true;
  }
  try {
    const options = {
      extraFunctions: {
        startsWith: (str, prefix) => str?.startsWith(prefix) || false,
        endsWith: (str, suffix) => str?.endsWith(suffix) || false,
        contains: (str, substring) => str?.includes(substring) || false,
        toLowerCase: (str) => str?.toLowerCase() || "",
        toUpperCase: (str) => str?.toUpperCase() || ""
      }
    };
    const compiledExpression = compileExpression(expression, options);
    return (transcript) => {
      try {
        const context = {
          // Basic fields
          id: transcript.id,
          model: transcript.model,
          split: transcript.split,
          concerningScore: transcript.concerningScore,
          summary: transcript.summary,
          judgeSummary: transcript.judgeSummary,
          justification: transcript.justification,
          // Individual score fields (scores.scoreA becomes scoreA)
          ...Object.fromEntries(
            Object.entries(transcript.scores || {}).map(([key, value]) => [key, value])
          ),
          // Also keep scores object for scores.scoreA syntax
          scores: transcript.scores || {}
        };
        return Boolean(compiledExpression(context));
      } catch (error) {
        console.warn("Filter evaluation failed for transcript:", transcript.id, error);
        return false;
      }
    };
  } catch (error) {
    console.warn("Filter compilation failed:", error);
    return () => true;
  }
}
function validateFilterExpression(expression) {
  if (!expression || !expression.trim()) {
    return null;
  }
  try {
    const options = {
      extraFunctions: {
        startsWith: () => true,
        endsWith: () => true,
        contains: () => true,
        toLowerCase: () => "",
        toUpperCase: () => ""
      }
    };
    compileExpression(expression, options);
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : "Invalid expression";
  }
}
function getFilterExamples() {
  return [
    "scoreA < 5",
    "scoreA < 5 and scoreB > 3",
    "1 < scoreA < 4",
    "scoreA in (1, 3, 5)",
    'split == "scheming"',
    'split in ("scheming", "power_seeking")',
    'startsWith(model, "gpt")',
    'contains(summary, "refusal")',
    "concerningScore > 7 and scoreA < 3",
    "(scoreA == 1 or scoreA == 3) and scoreB < 6"
  ];
}
function getAvailableFields(scoreTypes) {
  const baseFields = [
    "id",
    "model",
    "split",
    "concerningScore",
    "summary",
    "judgeSummary"
  ];
  const customFunctions = [
    "startsWith",
    "endsWith",
    "contains",
    "toLowerCase",
    "toUpperCase"
  ];
  return [
    ...baseFields,
    ...scoreTypes,
    ...customFunctions
  ];
}
function FilterControls($$payload, $$props) {
  push();
  let { scoreTypes, filteredCount, totalCount } = $$props;
  let filterExamples = getFilterExamples();
  getAvailableFields(scoreTypes);
  let filterError = (() => {
    return validateFilterExpression(filterState.value.filterExpression);
  })();
  const each_array = ensure_array_like(filterExamples);
  $$payload.out += `<div class="card bg-base-100 shadow-sm"><div class="card-body"><h2 class="text-xl font-semibold mb-4">Filters</h2> <div class="form-control mb-4"><label class="label"><span class="label-text">Search in summary</span></label> <input type="text" placeholder="Search transcripts by summary text..." class="input input-bordered w-full"${attr("value", filterState.value.searchQuery)}/></div> <div class="form-control mb-4 autocomplete-container relative"><label class="label"><span class="label-text">Advanced Filter Expression</span> <div class="dropdown dropdown-end"><div tabindex="0" role="button" class="btn btn-ghost btn-xs"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div> <div class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80"><div class="text-sm"><h3 class="font-semibold mb-2">Filter Examples:</h3> <ul class="space-y-1"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let example = each_array[$$index];
    $$payload.out += `<li><code class="text-xs bg-base-200 px-1 py-0.5 rounded">${escape_html(example.expression)}</code> <br/> <span class="text-xs text-base-content/70">${escape_html(example.description)}</span></li>`;
  }
  $$payload.out += `<!--]--></ul></div></div></div></label> <input type="text" placeholder="e.g., concerningScore > 5 &amp;&amp; model = 'claude-3.5'"${attr_class(`input input-bordered w-full ${stringify(filterError ? "input-error" : "")}`)}${attr("value", filterState.value.filterExpression)} autocomplete="off"/> `;
  if (filterError) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<label class="label"><span class="label-text-alt text-error">${escape_html(filterError)}</span></label>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="flex justify-between items-center text-sm text-base-content/70"><span>Showing ${escape_html(filteredCount.toLocaleString())} of ${escape_html(totalCount.toLocaleString())} transcripts</span> `;
  if (filteredCount !== totalCount) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<button class="btn btn-ghost btn-xs">Clear filters</button>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div></div>`;
  pop();
}
function ViewModeToggle($$payload, $$props) {
  push();
  $$payload.out += `<div class="tabs tabs-boxed"><button${attr_class(`tab ${stringify(viewSettings.value.viewMode === "tree" ? "tab-active" : "")}`)}>Tree View</button> <button${attr_class(`tab ${stringify(viewSettings.value.viewMode === "list" ? "tab-active" : "")}`)}>List View</button></div>`;
  pop();
}
function ErrorDisplay($$payload, $$props) {
  push();
  let { errors, stats, title = "Loading Errors", showDetails = false } = $$props;
  let showDetailsState = showDetails;
  function getErrorIcon(errorType) {
    switch (errorType) {
      case "file_not_found":
        return "📁";
      case "permission_denied":
        return "🔒";
      case "parse_error":
        return "📄";
      case "validation_error":
        return "⚠️";
      default:
        return "❌";
    }
  }
  function getErrorColor(errorType) {
    switch (errorType) {
      case "file_not_found":
        return "alert-warning";
      case "permission_denied":
        return "alert-error";
      case "parse_error":
        return "alert-error";
      case "validation_error":
        return "alert-warning";
      default:
        return "alert-error";
    }
  }
  function formatErrorType(errorType) {
    return errorType.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  }
  let groupedErrors = (() => {
    const groups = {};
    console.log("🔧 ErrorDisplay: Processing", errors?.length || 0, "errors");
    if (!errors || !Array.isArray(errors)) {
      console.log("🔧 ErrorDisplay: errors is not a valid array:", errors);
      return groups;
    }
    errors.forEach((error, index) => {
      if (index === 0) {
        console.log("🔧 ErrorDisplay: First error structure:", {
          type: error?.type,
          message: error?.message,
          file: error?.file,
          hasDetails: !!error?.details,
          hasValidationErrors: !!error?.validationErrors,
          hasPartialData: !!error?.partialData
        });
      }
      if (!groups[error.type]) {
        groups[error.type] = [];
      }
      const cleanError = {
        type: error.type,
        message: error.message,
        file: error.file,
        details: error.details,
        validationErrors: error.validationErrors,
        partialData: error.partialData ? {
          hasMetadata: error.partialData.hasMetadata,
          hasEvents: error.partialData.hasEvents,
          eventCount: error.partialData.eventCount,
          version: error.partialData.version,
          sessionId: error.partialData.sessionId
        } : void 0
      };
      groups[error.type].push(cleanError);
    });
    console.log("🔧 ErrorDisplay: Final groups:", Object.keys(groups), "entries count:", Object.entries(groups).length);
    return groups;
  })();
  if (errors.length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="space-y-4"><div class="alert alert-warning"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"></path></svg> <div><h3 class="font-bold">${escape_html(title)}</h3> <div class="text-sm">${escape_html(errors.length)} error${escape_html(errors.length !== 1 ? "s" : "")} occurred while loading transcript data. `;
    if (stats) {
      $$payload.out += "<!--[-->";
      $$payload.out += `Successfully loaded ${escape_html(stats.successfulFiles)}/${escape_html(stats.totalFiles)} files.`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div> <div><button class="btn btn-sm btn-outline">${escape_html(showDetailsState ? "Hide" : "Show")} Details</button></div></div> `;
    if (stats) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="stats shadow"><div class="stat"><div class="stat-title">Total Files</div> <div class="stat-value text-primary">${escape_html(stats.totalFiles)}</div></div> <div class="stat"><div class="stat-title">Successful</div> <div class="stat-value text-success">${escape_html(stats.successfulFiles)}</div></div> <div class="stat"><div class="stat-title">Failed</div> <div class="stat-value text-error">${escape_html(stats.failedFiles)}</div></div> <div class="stat"><div class="stat-title">Validation Errors</div> <div class="stat-value text-warning">${escape_html(stats.validationErrors)}</div></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (showDetailsState) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="space-y-3">`;
      if (Object.entries(groupedErrors).length === 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="alert alert-info"><span>No error details available to display.</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
        const each_array = ensure_array_like(Object.entries(groupedErrors));
        $$payload.out += `<!--[-->`;
        for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
          let [errorType, errorList] = each_array[$$index_1];
          const each_array_1 = ensure_array_like(errorList);
          $$payload.out += `<div class="collapse collapse-arrow bg-base-200"><input type="checkbox"/> <div class="collapse-title text-lg font-medium"><div class="flex items-center gap-2"><span class="text-2xl">${escape_html(getErrorIcon(errorType))}</span> <span>${escape_html(formatErrorType(errorType))}</span> <span class="badge badge-neutral">${escape_html(errorList.length)}</span></div></div> <div class="collapse-content"><div class="space-y-2"><!--[-->`;
          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
            let error = each_array_1[$$index];
            $$payload.out += `<div${attr_class(`alert ${stringify(getErrorColor(error.type))} alert-sm`)}><div class="flex-1"><div class="font-medium">${escape_html(error.message)}</div> `;
            if (error.file) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<div class="text-xs opacity-70 font-mono">${escape_html(error.file)}</div>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]--> `;
            if (error.details) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<div class="text-xs mt-1">${escape_html(error.details)}</div>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]--> `;
            if (error.validationErrors) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<details class="mt-2"><summary class="text-xs cursor-pointer hover:text-primary">Show validation errors</summary> <pre class="text-xs mt-1 p-2 bg-base-300 rounded overflow-x-auto">${escape_html(error.validationErrors)}</pre></details>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]--> `;
            if (error.partialData) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<details class="mt-2"><summary class="text-xs cursor-pointer hover:text-primary">Show partial data info</summary> <div class="text-xs mt-1 p-2 bg-base-300 rounded"><div>Has metadata: ${escape_html(error.partialData.hasMetadata ? "Yes" : "No")}</div> <div>Has events: ${escape_html(error.partialData.hasEvents ? "Yes" : "No")}</div> <div>Event count: ${escape_html(error.partialData.eventCount)}</div> <div>Version: ${escape_html(error.partialData.version || "Unknown")}</div> <div>Session ID: ${escape_html(error.partialData.sessionId || "Unknown")}</div></div></details>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]--></div></div>`;
          }
          $$payload.out += `<!--]--></div></div></div>`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function buildFolderTreeFromTranscripts(transcripts) {
  const rootNode = {
    id: "root",
    name: "root",
    path: "",
    type: "folder",
    subRows: [],
    isEmpty: false,
    transcriptCount: 0
  };
  const folderMap = /* @__PURE__ */ new Map();
  folderMap.set("", rootNode);
  for (const transcript of transcripts) {
    const filePath = transcript._filePath || "";
    const pathParts = filePath.split("/");
    const directoryParts = pathParts.slice(0, -1);
    const directoryPath = directoryParts.join("/");
    let currentPath = "";
    let currentFolder = rootNode;
    for (const folderName of directoryParts) {
      currentPath = currentPath ? `${currentPath}/${folderName}` : folderName;
      if (!folderMap.has(currentPath)) {
        const folder = {
          id: currentPath,
          name: folderName,
          path: currentPath,
          type: "folder",
          subRows: [],
          isEmpty: false,
          transcriptCount: 0
        };
        folderMap.set(currentPath, folder);
        currentFolder.subRows.push(folder);
      }
      currentFolder = folderMap.get(currentPath);
    }
    const transcriptNode = {
      id: directoryPath ? `${directoryPath}/${transcript.id}` : transcript.id,
      name: transcript.summary.substring(0, 50) + (transcript.summary.length > 50 ? "..." : ""),
      path: directoryPath ? `${directoryPath}/${transcript.id}` : transcript.id,
      type: "transcript",
      // Include all transcript data directly in the unified format
      model: transcript.model,
      split: transcript.split,
      summary: transcript.summary,
      scores: transcript.scores,
      concerningScore: transcript.concerningScore,
      judgeSummary: transcript.judgeSummary,
      justification: transcript.justification,
      tags: transcript.tags,
      originalTranscript: transcript
    };
    currentFolder.subRows.push(transcriptNode);
  }
  updateFolderCounts(rootNode);
  sortFolderTree(rootNode);
  return rootNode.subRows || [];
}
function updateFolderCounts(node) {
  if (node.type === "transcript") {
    return 1;
  }
  if (node.type === "folder" && node.subRows) {
    let totalCount = 0;
    for (const child of node.subRows) {
      totalCount += updateFolderCounts(child);
    }
    node.transcriptCount = totalCount;
    node.isEmpty = totalCount === 0;
    return totalCount;
  }
  return 0;
}
function sortFolderTree(node) {
  if (node.type !== "folder" || !node.subRows) return;
  node.subRows.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === "folder" ? -1 : 1;
    }
    if (a.type === "folder") {
      return a.name.localeCompare(b.name);
    } else {
      const aId = a.originalTranscript?.id || a.id;
      const bId = b.originalTranscript?.id || b.id;
      return aId.localeCompare(bId);
    }
  });
  for (const child of node.subRows) {
    if (child.type === "folder") {
      sortFolderTree(child);
    }
  }
}
function createTranscriptDataLoader() {
  let rawTranscripts = [];
  let loading = true;
  let error = null;
  let loadingErrors = [];
  let loadingStats = null;
  let transcripts = rawTranscripts;
  let folderTree = buildFolderTreeFromTranscripts(rawTranscripts);
  async function loadData(viewMode, subdirectoryPath) {
    console.log("🔄 [DEBUG] Starting unified loadData()...", { viewMode, subdirectoryPath });
    loading = true;
    error = null;
    loadingErrors = [];
    loadingStats = null;
    try {
      const includeErrors = true;
      let rootDirParam = "";
      if (subdirectoryPath) {
        rootDirParam = `&rootDir=${encodeURIComponent(subdirectoryPath)}`;
      }
      await loadDataBulk(rootDirParam, includeErrors);
    } catch (err) {
      error = err instanceof Error ? err.message : "Unknown error";
      console.error("💥 [DEBUG] Failed to load data:", err);
      rawTranscripts = [];
      loadingStats = null;
      loadingErrors = [
        { type: "unknown_error", message: error, file: "API Request" }
      ];
    } finally {
      loading = false;
      console.log("🏁 [DEBUG] Loading complete. Final state:", {
        loading,
        error,
        rawTranscriptsLength: rawTranscripts.length,
        derivedTranscriptsLength: transcripts.length,
        derivedFolderTreeLength: folderTree.length
      });
    }
  }
  async function loadDataBulk(rootDirParam, includeErrors) {
    const url = `/api/transcripts/list${rootDirParam ? `?${rootDirParam.slice(1)}` : ""}`;
    console.log("🌐 [DEBUG] Fetching unified data from:", url);
    const response = await fetch(url);
    console.log("📡 [DEBUG] Response:", response.status, response.ok);
    if (!response.ok) {
      throw new Error(`Failed to load transcripts: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    rawTranscripts = Array.isArray(data) ? data : [];
    loadingStats = null;
    loadingErrors = [];
    console.log("✅ [DEBUG] Data loaded successfully:", {
      transcriptCount: rawTranscripts.length,
      hasStats: !!loadingStats,
      errorCount: loadingErrors.length
    });
  }
  return {
    get transcripts() {
      return transcripts;
    },
    get folderTree() {
      return folderTree;
    },
    get loading() {
      return loading;
    },
    get error() {
      return error;
    },
    get loadingErrors() {
      return loadingErrors;
    },
    get loadingStats() {
      return loadingStats;
    },
    loadData
  };
}
function extractAllTranscriptsFromTree(nodes) {
  const transcripts = [];
  for (const node of nodes) {
    if (node.type === "transcript") {
      transcripts.push(node.originalTranscript);
    } else if (node.type === "folder" && node.subRows) {
      transcripts.push(...extractAllTranscriptsFromTree(node.subRows));
    }
  }
  return transcripts;
}
function filterFolderTree(nodes, filters, filterFunction) {
  if (!nodes) {
    console.warn("⚠️ [DEBUG] filterFolderTree received undefined nodes");
    return [];
  }
  return nodes.map((node) => {
    if (node.type === "transcript") {
      const transcript = node.originalTranscript;
      if (!transcript) {
        console.warn("⚠️ [DEBUG] Transcript node missing originalTranscript:", node);
        return null;
      }
      if (filters.searchQuery && !transcript.summary.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return null;
      }
      if (!filterFunction(transcript)) return null;
      return node;
    } else if (node.type === "folder") {
      const filteredChildren = filterFolderTree(node.subRows || [], filters, filterFunction);
      if (filteredChildren.length > 0) {
        return {
          ...node,
          subRows: filteredChildren
          // Use subRows instead of children
        };
      }
      return null;
    }
    return null;
  }).filter((node) => node !== null);
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  const dataLoader = createTranscriptDataLoader();
  let currentPath = store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("path") || "";
  let breadcrumbSegments = (() => {
    if (!currentPath) return [];
    const pathParts = currentPath.split("/").filter(Boolean);
    const segments = [];
    for (let i = 0; i < pathParts.length; i++) {
      const segment = pathParts[i];
      const cumulativePath = pathParts.slice(0, i + 1).join("/");
      segments.push({ name: segment, path: cumulativePath });
    }
    return segments;
  })();
  let allTranscripts = (() => {
    console.log("🔍 [DEBUG] Computing allTranscripts...", {
      viewMode: viewSettings.value.viewMode,
      transcriptsLength: dataLoader.transcripts.length,
      folderTreeLength: dataLoader.folderTree.length
    });
    const result = viewSettings.value.viewMode === "list" ? dataLoader.transcripts : extractAllTranscriptsFromTree(dataLoader.folderTree || []);
    console.log("📊 [DEBUG] allTranscripts computed, length:", result.length);
    return result;
  })();
  let scoreTypes = (() => {
    console.log("🏷️ [DEBUG] Computing scoreTypes from", allTranscripts.length, "transcripts...");
    const result = [
      ...new Set(allTranscripts.flatMap((t) => Object.keys(t.scores || {})))
    ].sort();
    console.log("🏷️ [DEBUG] scoreTypes computed:", result);
    return result;
  })();
  let scoreDescriptions = (() => {
    console.log("📝 [DEBUG] Collecting score descriptions from", allTranscripts.length, "transcripts...");
    const result = collectScoreDescriptions(allTranscripts);
    console.log("📝 [DEBUG] scoreDescriptions collected:", Object.keys(result));
    return result;
  })();
  let filterFunction = (() => {
    console.log("🔧 [DEBUG] Creating filter function for expression:", filterState.value.filterExpression);
    const result = createFilterFunction(filterState.value.filterExpression);
    console.log("🔧 [DEBUG] Filter function created");
    return result;
  })();
  let filteredTranscripts = dataLoader.transcripts.filter((transcript) => {
    if (filterState.value.searchQuery && !transcript.summary.toLowerCase().includes(filterState.value.searchQuery.toLowerCase())) return false;
    return filterFunction(transcript);
  });
  let filteredFolderTree = filterFolderTree(dataLoader.folderTree || [], filterState.value, filterFunction);
  let filteredTranscriptCount = viewSettings.value.viewMode === "list" ? filteredTranscripts.length : extractAllTranscriptsFromTree(filteredFolderTree).length;
  let totalTranscriptCount = allTranscripts.length;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(currentPath ? `${currentPath} - Bloom Transcript Viewer` : "Bloom Transcript Viewer")}</title>`;
  });
  $$payload.out += `<div class="container mx-auto p-4 space-y-6">`;
  if (breadcrumbSegments.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(breadcrumbSegments);
    $$payload.out += `<div class="breadcrumbs text-sm"><ul><li><a href="/" class="font-mono text-xs">Home</a></li> <!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let segment = each_array[index];
      $$payload.out += `<li>`;
      if (index === breadcrumbSegments.length - 1) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="font-mono text-xs font-semibold">${escape_html(segment.name)}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<a${attr("href", `/?path=${stringify(encodeURIComponent(segment.path))}`)} class="font-mono text-xs transition-colors"${attr("title", `Navigate to ${stringify(segment.path)}`)}>${escape_html(segment.name)}</a>`;
      }
      $$payload.out += `<!--]--></li>`;
    }
    $$payload.out += `<!--]--></ul></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="flex justify-between items-center"><div><h1 class="text-3xl font-bold">Bloom Transcript Viewer</h1> `;
  if (currentPath) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-sm text-base-content/70 mt-1">Viewing: ${escape_html(currentPath)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="flex items-center gap-4">`;
  ViewModeToggle($$payload);
  $$payload.out += `<!----> <div class="badge badge-neutral">`;
  if (dataLoader.loading) {
    $$payload.out += "<!--[-->";
    $$payload.out += `Loading...`;
  } else if (dataLoader.error) {
    $$payload.out += "<!--[1-->";
    $$payload.out += `Error`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `${escape_html(filteredTranscriptCount)} / ${escape_html(totalTranscriptCount)} transcripts`;
  }
  $$payload.out += `<!--]--></div></div></div> `;
  FilterControls($$payload, {
    scoreTypes,
    filteredCount: filteredTranscriptCount,
    totalCount: totalTranscriptCount
  });
  $$payload.out += `<!----> `;
  if (dataLoader.loadingErrors && dataLoader.loadingErrors.length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="mb-6">`;
    ErrorDisplay($$payload, {
      errors: dataLoader.loadingErrors,
      title: "File Loading Errors",
      showDetails: false
    });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (dataLoader.loading && dataLoader.transcripts.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-center py-12"><div class="loading loading-spinner loading-lg"></div> <p class="mt-4 text-base-content/70">Loading ${escape_html(viewSettings.value.viewMode === "list" ? "transcripts" : "folder tree")}...</p></div>`;
  } else if (dataLoader.error) {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<div class="text-center py-12"><div class="text-error"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"></path></svg> <p class="text-lg font-medium">Failed to load ${escape_html(viewSettings.value.viewMode === "list" ? "transcripts" : "folder tree")}</p> <p class="text-sm">${escape_html(dataLoader.error)}</p></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="card bg-base-100 shadow-sm"><div class="card-body"><div class="flex justify-between items-center mb-4"><h2 class="text-xl font-bold">${escape_html(viewSettings.value.viewMode === "tree" ? "Folder Tree" : "Transcript List")}</h2></div> `;
    TranscriptTable($$payload, {
      transcripts: filteredTranscripts,
      folderTree: filteredFolderTree,
      scoreTypes,
      scoreDescriptions,
      viewMode: viewSettings.value.viewMode,
      currentPath
    });
    $$payload.out += `<!----></div></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CW90Kqod.js.map
