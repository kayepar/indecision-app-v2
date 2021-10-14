import React, { useState, memo, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';
import ConfirmationModal from './ConfirmationModal';

const OptionsMenu = ({ hasOptions, optionsDispatch, autoDelete, autoDeleteDispatch }) => {
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

    const handleCloseConfirmation = useCallback(() => {
        setShowConfimation(false);
    }, []);

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
                <MenuItem className="menu-item" disabled={!hasOptions} onClick={handleOpenConfirmation}>
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

export default memo(OptionsMenu);
