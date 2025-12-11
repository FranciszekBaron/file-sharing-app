export const sortByItems = [
{id:'name',label: "Nazwa"},
{id:'date',label: "Data modyfikacji"},
{id:'dif',label: "Data modyfikacji przeze mnie"},
{id:'dif',label: "Data otwarcia przeze mnie"}
] as const;

export const sortByItemsDelete = [
{id:'name',label: "Nazwa"},
{id:'date',label: "Data modyfikacji"},
{id:'dif',label: "Data modyfikacji przeze mnie"},
{id:'dif',label: "Data otwarcia przeze mnie"},
{id:'deletedAt',label: "Data Usunięcia"}
] as const;

export const sortOrderItems = [
{id:true,label: "Od A do Z"},
{id:false,label: "Od Z do A"}
] as const;

export const sortFoldersItem = [
{id:true,label: "Na górze"},
{id:false,label: "Mieszanina z plikami"}
] as const;


export const sortDateItem = [
    {id:true,label:"Od starych do nowych"},
    {id:false,label:"Od nowych do starych"}
]
