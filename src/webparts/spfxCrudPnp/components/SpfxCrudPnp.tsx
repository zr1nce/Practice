import * as React from 'react';
import { ISpfxCrudPnpProps } from './ISpfxCrudPnpProps';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from '@pnp/sp/webs';
import { PrimaryButton, Stack, TextField } from '@fluentui/react';
import { ListItem } from './ListItem';

interface SpfxCrudPnpState {
  itemId: number;
  fullName: string;
  age: number;
  allItems: Array<{ Id: number; Title: string; Age: number }>;
}


const textFieldStyles = {
  root: { width: '100%', marginBottom: '10px' },
  fieldGroup: { borderColor: '#0078d4' },
  field: { color: '#555' },
  label: { color: '#333', fontWeight: 'bold' },
};


export default class SpFxCrud extends React.Component<ISpfxCrudPnpProps, SpfxCrudPnpState> {

  constructor(props: ISpfxCrudPnpProps) {
    super(props);
    this.state = {
      itemId: 0,
      fullName: "",
      age: 0,
      allItems: [],
    }
  }

  private onFullNameChange = (value: string | undefined) => {
    if (value)
      this.setState({ fullName: value });
    else
      this.setState({ fullName: "" });
  }

  private onAgeChange = (value: string | undefined) => {
    if (value !== undefined && value !== '' && !isNaN(Number(value))) {
      this.setState({ age: Number(value) });
    } else {
      this.setState({ age: 0 });
    }
  }


  private clearSelection = () => {
    this.setState({
      fullName: '',
      age: 0,
    });
  };

  public render(): React.ReactElement<ISpfxCrudPnpProps> {
    return <Stack tokens={{ childrenGap: "20px" }}>
      <Stack horizontal tokens={{ childrenGap: "10px" }}>
        <TextField
          label="Full Name"
          value={this.state.fullName}
          onChange={(event, newValue) => { this.onFullNameChange(newValue) }}
          styles={textFieldStyles}
        />
        <TextField
          label="Age"
          value={this.state.age === null ? '' : this.state.age.toString()}
          onChange={(event, newValue) => { this.onAgeChange(newValue) }}
          styles={textFieldStyles}
        />
      </Stack>
      <Stack tokens={{ childrenGap: "10px" }}>
        {this.state.allItems.map((item) => (
          <ListItem item={item} key={item.Id} updateItem={this.updateItem} deleteItem={this.deleteItem} />
        ))}
      </Stack>
      <Stack horizontal verticalAlign='center' tokens={{ childrenGap: "10px" }}>
        <PrimaryButton text="Create" onClick={this.createItem} iconProps={{ iconName: "Add" }} />
        <PrimaryButton text="Read All" onClick={this.getAllItems} iconProps={{ iconName: "Search" }} />
      </Stack>
    </Stack>;
  }




  private createItem = async () => {
    try {
      const web = Web("https://zrincework.sharepoint.com/sites/First")
      const { fullName, age } = this.state;

      const addItem = await web.lists.getByTitle("F1rst").items.add({
        'Title': fullName,
        'Age': age
      });

      console.log(addItem);
      alert(`Item created successfully with ID: ${addItem.data.ID}`);
    } catch (e) {
      console.error(e);
    }
  };


  private getAllItems = async () => {
    try {
      const web = Web("https://zrincework.sharepoint.com/sites/First")
      const items: any[] = await web.lists.getByTitle("F1rst").items.get();
      console.log(items);
      if (items.length > 0) {
        this.setState({ allItems: items })
      } else {
        alert(`List is empty.`);
      }
    }
    catch (e) {
      console.error(e);
    }
  }


  private updateItem = async (itemId: number) => {
    try {
      const web = Web("https://zrincework.sharepoint.com/sites/First")
      const { fullName, age } = this.state;

      if (itemId !== null) {
        const itemUpdate = await web.lists.getByTitle("F1rst").items.getById(itemId).update({
          'Title': fullName,
          'Age': age
        });

        console.log(itemUpdate);
        alert(`Item with ID: ${itemId} updated successfully!`);

        this.clearSelection();
      } else {
        alert(`Please select an item to update.`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  private deleteItem = async (itemId: number) => {
    try {
      const web = Web("https://zrincework.sharepoint.com/sites/First")

      if (itemId !== null) {
        let deleteItem = await web.lists.getByTitle("F1rst").items.getById(itemId).delete();
        console.log(deleteItem);
        alert(`Item with ID: ${itemId} deleted successfully!`);

        this.clearSelection();
      } else {
        alert(`Please select an item to delete.`);
      }
    } catch (e) {
      console.error(e);
    }
  };
}

