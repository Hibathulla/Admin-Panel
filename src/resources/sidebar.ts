import {
  CategoryIcon,
  DashboardIcon,
  OrdersIcon,
  ProductsIcon,
  SettingsIcon,
  SizesIcon,
  UserIcon,
} from "@assets/layouts";

export const sidebarLinks = [
  {
    id: 1,
    label: "Dashboard",
    icon: DashboardIcon,
    slug: "dashboard",
    url: "/dashboard",
  },
  {
    id: 2,
    label: "Products",
    icon: ProductsIcon,
    slug: "products",
    url: "/products",
  },
  {
    id: 3,
    label: "Categories",
    icon: CategoryIcon,
    slug: "category",
    url: "/category",
  },
  {
    id: 4,
    label: "Sizes",
    icon: SizesIcon,
    slug: "size",
    url: "/size",
  },
  {
    id: 5,
    label: "Users",
    icon: UserIcon,
    slug: "users",
    url: "/users",
  },
  {
    id: 6,
    label: "Orders",
    icon: OrdersIcon,
    slug: "orders",
    url: "/orders",
  },
  {
    id: 7,
    label: "Settings",
    icon: SettingsIcon,
    slug: "settings",
    url: "/settings",
  },
];
