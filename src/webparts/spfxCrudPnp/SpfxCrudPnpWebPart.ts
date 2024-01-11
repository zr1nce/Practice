import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpfxCrudPnpWebPartStrings';
import SpfxCrudPnp from './components/SpfxCrudPnp';
import { ISpfxCrudPnpProps } from './components/ISpfxCrudPnpProps';
import { sp } from "@pnp/sp/presets/all";

export interface ISpfxCrudPnpWebPartProps {
  description: string;
}

export default class SpfxCrudPnpWebPart extends BaseClientSideWebPart<ISpfxCrudPnpWebPartProps> {


  public render(): void {
    const element: React.ReactElement<ISpfxCrudPnpProps> = React.createElement(
      SpfxCrudPnp,
      {
        description: this.properties.description,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected async onInit(): Promise<void> {

    await super.onInit();
  
    // other init code may be present
  
    sp.setup(this.context as any);
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
