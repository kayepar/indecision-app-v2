import { withStyles } from '@material-ui/core/styles';

const MaterialUiCss = withStyles({
    '@global': {
        '.MuiIconButton-root': {
            // fontSize: '1rem',
            color: '#fdd621',
        },
        '.MuiSvgIcon-root': {
            fontSize: '2rem',
        },
    },
})(() => null);

export default MaterialUiCss;
