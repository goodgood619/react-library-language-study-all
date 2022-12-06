import {Button,Menu, MenuDivider, MenuItem} from '@blueprintjs/core';
import {Example,IExampleProps} from '@blueprintjs/docs-theme';
import {Popover2} from '@blueprintjs/popover2';

const DropDownMenuExample = () => {
    const exampleMenu = (
            <Menu>
                <MenuItem icon="graph" text="graph"/>
                <MenuItem icon="map" text="Map"/>
                <MenuItem icon="th" text="Table" shouldDismissPopover={false} />
                <MenuItem icon="zoom-to-fit" text="Nucleus" disabled={true} />
                <MenuDivider />
                <MenuItem icon="cog" text="Settings...">
                    <MenuItem icon="add" text="Add new application" disabled={true} />
                    <MenuItem icon="remove" text="Remove application" />
                </MenuItem>
            </Menu>
    );
    return (
        <Example options={false}>
            <Popover2 content={exampleMenu} placement="right-end">
                <Button icon="share" text="DropDown"/>
            </Popover2>
        </Example>
    );
};

export default DropDownMenuExample;