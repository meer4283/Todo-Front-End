import React, { useState, useEffect } from "react";
import { Paginator } from "primereact/paginator";
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { useTodoTaskHook } from "./TodoTaskHook";

const TodoTaskPaginator = () => {
  const [paginatorFirst, setPaginatorFirst] = useState<number>(0);
  const {
    getTodoTaskList,
    updateTodoTaskPaginated,
    TodoTaskFilter,
    TodoTaskPage,
    TodoTaskPerPage,
    TodoTaskTotalRecords,
    TodoTaskLoading
  } = useTodoTaskHook();

  const onBasicPageChange = (event: any) => {
    setPaginatorFirst(event.first);

    updateTodoTaskPaginated({
      page: event.page + 1,
      per_page: event.rows,
    });
  };

  useEffect(() => {
    getTodoTaskList();
  }, [TodoTaskPerPage, TodoTaskFilter, TodoTaskPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const paginatorTemplate: any = {
    layout:
      "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",

    PageLinks: (options: any) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className: any = "";

        return (
          <span className={className} style={{ userSelect: "none" }}>
            ...
          </span>
        );
      }

      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
        >
          {options.page + 1}
          <Ripple />
        </button>
      );
    },

    RowsPerPageDropdown: (options: any) => {
      const dropdownOptions = [5, 10, 20, 100, 120];
      //dropdownOptions.push(parseInt(getTenantPlatformConfigurationValueFromKey("table_default_rows")));
      dropdownOptions.sort(function (a, b) {
        return a - b;
      });

      return (
        <React.Fragment>
          <span
            className="mx-1"
            style={{ color: "var(--text-color)", userSelect: "none" }}
          >
            Items per page:{" "}
          </span>
          <Dropdown
            value={options.value}
            options={dropdownOptions}
            onChange={options.onChange}
          />
        </React.Fragment>
      );
    },
    CurrentPageReport: (options: any) => {
      return (
        <span
          style={{
            color: "var(--text-color)",
            userSelect: "none",
            width: "120px",
            textAlign: "center",
          }}
        >
          {options.first} - {options.last} of {options.totalRecords}
        </span>
      );
    },
  };

  return (
    <>
    {!TodoTaskLoading ? (
    <div className="card m-0 p-1">
        <Paginator
          template={paginatorTemplate}
          first={paginatorFirst}
          rows={TodoTaskPerPage}
          totalRecords={TodoTaskTotalRecords}
          onPageChange={onBasicPageChange}
        ></Paginator>
      </div>) : <></>}
      </>
  );
};

export { TodoTaskPaginator };
