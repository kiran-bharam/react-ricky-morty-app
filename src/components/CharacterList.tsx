import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MaterialReactTable } from "material-react-table";
import { getCharacters } from "../services/api";

export default function CharactersList() {
  const [characters, setCharacters] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const page = parseInt(searchParams.get("page") || "1");
  const navigate = useNavigate();

  const fetchCharacters = async (pageIndex: number) => {
    setLoading(true);
    const response = await getCharacters(pageIndex);
    setCharacters(response.results);
    setPageCount(response.info.pages);
    setLoading(false);
  };

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name", size: 200 },
    { accessorKey: "species", header: "Species" },
    { accessorKey: "gender", header: "Gender" },
    { accessorKey: "status", header: "Status" },
  ];

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Rick and Morty Characters
      </h1>
      <div className="text-right">
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
          onClick={() => fetchCharacters(page)}
        >
          Refresh
        </button>
      </div>
      <MaterialReactTable
        columns={columns}
        data={characters}
        state={{
          isLoading: loading,
          pagination: { pageIndex: page - 1, pageSize: 20 },
        }}
        manualPagination
        rowCount={pageCount * 20}
        onPaginationChange={(updater) => {
          const newState =
            typeof updater === "function"
              ? updater({ pageIndex: page, pageSize: 20 })
              : updater;

          const newPage = newState.pageIndex;
          setSearchParams({ page: newPage.toString() });
        }}
        muiPaginationProps={{
          rowsPerPageOptions: [20],
          showFirstButton: false,
          showLastButton: false,
        }}
        muiTableBodyRowProps={(row: any) => ({
          onClick: () => navigate(`/character/${row.row.original.id}`),
          style: { cursor: "pointer" },
        })}
      />
    </div>
  );
}
