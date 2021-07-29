import { Component, OnInit } from '@angular/core';
import { ICategoryStructure } from 'src/app/sidebar/sidebarModel/link.model';
@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public categories: ICategoryStructure[] = [
    {
      id: 1,
      isDropDownMenu: false,
      description: 'description1',
      dropDownTarget: '',
      subMenuList: []
    },
    {
      id: 2,
      isDropDownMenu: true,
      description: 'description2',
      dropDownTarget: 'description2Target',
      subMenuList: ['description2', 'description2', 'description2']
    },
    {
      id: 3,
      isDropDownMenu: true,
      description: 'description3',
      dropDownTarget: 'description3Target',
      subMenuList: ['subDescription1', 'subDescription2', 'subDescription3']
    }
  ];
}
