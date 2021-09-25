import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';
import ConfirmationModal from './ConfirmationModal';

const OptionsMenu = ({ options, optionsDispatch, autoDelete, autoDeleteDispatch }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showConfirmation, setShowConfimation] = useState(false);

    const handleOpenMenu = (e) => {
        const target = e.currentTarget;
        setAnchorEl(target);
    };

    const handleCloseMenu = () => setAnchorEl(null);

    const handleAutoDeleteSwitch = () => {
        autoDeleteDispatch({ type: 'SET_VALUE', value: !autoDelete });
    };

    const handleOpenConfirmation = () => {
        handleCloseMenu();
        setShowConfimation(true);
    };

    const handleCloseConfirmation = () => {
        setShowConfimation(false);
    };

    return (
        <div>
            <IconButton
                aria-label="options-menu"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleOpenMenu}
            >
                <MenuIcon className="menu-icon" />
            </IconButton>
            <Menu
                id="options-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                keepMounted
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem className="menu-item" onClick={handleAutoDeleteSwitch}>
                    Auto-delete
                    <Switch
                        size="small"
                        checked={autoDelete}
                        onChange={handleAutoDeleteSwitch}
                        name="auto-delete-switch"
                        inputProps={{ 'aria-label': 'auto-delete-switch' }}
                    />
                </MenuItem>
                <MenuItem className="menu-item" disabled={!options.length > 0} onClick={handleOpenConfirmation}>
                    Delete All
                </MenuItem>
            </Menu>
            <ConfirmationModal
                optionsDispatch={optionsDispatch}
                showConfirmation={showConfirmation}
                handleClose={handleCloseConfirmation}
            />
        </div>
    );
};

export default OptionsMenu;
