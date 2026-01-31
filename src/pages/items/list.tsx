import {useMemo, useState} from 'react'
import {ListView} from "@/components/refine-ui/views/list-view.tsx";
import {Breadcrumb} from "@/components/refine-ui/layout/breadcrumb.tsx";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {CATEGORIES_OPTIONS} from "@/constants";
import {CreateButton} from "@/components/refine-ui/buttons/create.tsx";
import {DataTable} from "@/components/refine-ui/data-table/data-table.tsx";
import {useTable} from "@refinedev/react-table";
import {Item} from "@/types";
import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge.tsx";

const ItemsList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedPerishable, setSelectedPerishable] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');

    const categoryFilters = selectedCategory === 'all' ? [] : [
        { field: 'category', operator: 'eq' as const, value: selectedCategory }
    ];
    const searchFilters = searchQuery ? [
        { field: 'name', operator: 'contains' as const, value: searchQuery }
    ] : [];

    const itemTable = useTable<Item>({
        columns: useMemo<ColumnDef<Item>[]>(() => [
            {
                id: 'id',
                accessorKey: 'id',
                size: 50,
                header: () => <p className="column-title ml-2">ID</p>,
                cell: ({ getValue }) => <span className="text-foreground">{ getValue<string>()}</span>
            },
            {
                id: 'name',
                accessorKey: 'name',
                size: 200,
                header: () => <p className="column-title">Nombre</p>,
                cell: ({ getValue }) => <span className="text-foreground">{ getValue<string>()}</span>,
                filterFn: 'includesString'
            },
            {
                id: 'category',
                accessorKey: 'category',
                size: 150,
                header: () => <p className="column-title">Categoría</p>,
                cell: ({ getValue }) => <Badge variant="secondary">{ getValue<string>()}</Badge>
            },
            {
                id: 'unit',
                accessorKey: 'unit',
                size: 100,
                header: () => <p className="column-title">Unidad</p>,
                cell: ({ getValue }) => <span className="text-foreground">{ getValue<string>()}</span>
            },
            {
                id: 'stockTotal',
                accessorKey: 'stockTotal',
                size: 100,
                header: () => <p className="column-title">Stock total</p>,
                cell: ({ getValue }) => <span className="text-foreground">{ getValue<string>()}</span>
            },
            {
                id: 'stockMinimum',
                accessorKey: 'stockMinimum',
                size: 100,
                header: () => <p className="column-title">Stock mín.</p>,
                cell: ({ getValue }) => <span className="text-foreground">{ getValue<string>()}</span>
            },
            {
                id: 'nearestExpiration',
                accessorKey: 'nearestExpiration',
                size: 150,
                header: () => <p className="column-title">Vence (próx.)</p>,
                cell: ({ getValue }) => <span className="text-foreground">{ getValue<string>()}</span>
            },
            {
                id: 'location',
                accessorKey: 'location',
                size: 150,
                header: () => <p className="column-title">Ubicación</p>,
                cell: ({ getValue }) => <Badge variant="secondary">{ getValue<string>()}</Badge>
            },
            {
                id: 'level',
                accessorKey: 'level',
                size: 100,
                header: () => <p className="column-title">Nivel</p>,
                cell: ({ getValue }) => <Badge>{ getValue<string>()}</Badge>
            },
        ], []),
        refineCoreProps: {
            resource: 'items',
            pagination: { pageSize: 10, mode: 'server' },
            filters: {
                permanent: [...categoryFilters, ...searchFilters]
            },
            sorters: {
                initial: [
                    { field: 'id', order: 'desc'},
                ]
            },
        }
    });

    return (
        <ListView>
            <Breadcrumb />

            <h1 className="page-title">Items</h1>

            <div className="intro-row">
                <p>Accesos directos para exportar y gestionar el inventario</p>

                <div className="actions-row">
                    <div className="search-field">
                        <Search className="search-icon" />

                        <Input
                            type="text"
                            placeholder="Buscar por nombre ..."
                            className="pl-10 w-full"
                            value={ searchQuery }
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <Select
                            value={ selectedCategory }
                            onValueChange={setSelectedCategory}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filtrar por categoría" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">
                                    Todas las categorías
                                </SelectItem>
                                {CATEGORIES_OPTIONS.map(category => (
                                    <SelectItem key={category.value}
                                    value={category.value}>
                                        {category.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <CreateButton label="Añadir"/>
                    </div>
                </div>
            </div>

            <DataTable table={ itemTable } />
        </ListView>
    )
}
export default ItemsList
