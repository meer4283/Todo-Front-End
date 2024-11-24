import { SidebarItem } from "./SidebarComponents/SidebarItem";
import { SidebarItemNested } from "./SidebarComponents/SidebarItemNested";
import { menuItems } from "@/utils/menuItem";
import { uid } from "uid";

const MenuComponent = () => {
  
  const RenderMenu = (menuItems:any, isNested:boolean) =>{
    return  menuItems.map((item:any, index:number) => {
      if(item?.submenu?.length > 0 ){
        return (
            <SidebarItemNested key={uid()} {...item} RenderMenu={RenderMenu} isNested={isNested} />
        )
      }
      else{
        return (<SidebarItem key={uid()} {...item} isNested={isNested} />)
      }  
    })
  }

  return (
    <ul className="list-none p-3 m-0">
     {RenderMenu(menuItems, false)}
    </ul>
  );
};

export default MenuComponent;
