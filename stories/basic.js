import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Avatar from '@material-ui/core/Avatar';
import Clear from '@material-ui/icons/Clear';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@material-ui/icons/Person';
import { withStyles } from '@material-ui/core/styles';

import MuiDownshift from '../src';
import StarWarsSelect from './components/StarWarsSelect';

const CustomDrawer = withStyles({ paper: { width: 240, padding: 8 } })(Drawer);

storiesOf('Basic', module)
  .add('defaults (empty)', () => <MuiDownshift />)
  .add('items only', () => <StarWarsSelect />)
  .add('disabled', () => <StarWarsSelect getInputProps={() => ({ disabled: true })} />)
  .add('without adornments', () => <StarWarsSelect getInputProps={() => ({ endAdornment: null })} />)
  .add('with custom adornments', () => (
    <StarWarsSelect
      getInputProps={({ isOpen, selectedItem, handleClearSelection }) => ({
        endAdornment: (
          <InputAdornment position="end">
            <div style={{ pointerEvents: 'none' }}>
              {isOpen ? <ArrowDropUp color="default" /> : <ArrowDropDown color="default" />}
            </div>
            {!!selectedItem && (
              <IconButton color="default" onClick={handleClearSelection} aria-label="Clear selection">
                <Clear />
              </IconButton>
            )}
          </InputAdornment>
        ),
      })}
      focusOnClear
      onChange={action('onChange')}
    />
  ))
  .add('loading', () => <StarWarsSelect loading />)
  .add('helperText', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        helperText: 'Pick your favorite',
      })}
    />
  ))
  .add('helperText with loading', () => (
    <StarWarsSelect
      loading={true}
      getInputProps={() => ({
        label: 'Star Wars character',
        helperText: 'Pick your favorite',
      })}
    />
  ))
  .add('helperText with error', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        error: true,
        helperText: 'Error',
      })}
    />
  ))
  .add('required', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        required: true,
      })}
    />
  ));

storiesOf('Variants', module)
  .add('standard', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
      })}
    />
  ))
  .add('filled', () => (
    <StarWarsSelect
      variant="filled"
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
      })}
      focusOnClear
      onChange={action('onChange')}
    />
  ))
  .add('outlined', () => (
    <StarWarsSelect
      variant="outlined"
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
      })}
      focusOnClear
      onChange={action('onChange')}
    />
  ))
  .add('outlined with custom adornments', () => (
    <StarWarsSelect
      variant="outlined"
      getInputProps={({ isOpen, selectedItem, handleClearSelection }) => ({
        placeholder: 'Choose wisely',
        endAdornment: (
          <InputAdornment position="end">
            <div style={{ pointerEvents: 'none' }}>
              {isOpen ? <ArrowDropUp color="default" /> : <ArrowDropDown color="default" />}
            </div>
            {!!selectedItem && (
              <IconButton color="default" onClick={handleClearSelection} aria-label="Clear selection">
                <Clear />
              </IconButton>
            )}
          </InputAdornment>
        ),
      })}
      focusOnClear
      onChange={action('onChange')}
    />
  ))
  .add('outlined with custom adornments and label', () => (
    <StarWarsSelect
      variant="outlined"
      getInputProps={({ isOpen, selectedItem, handleClearSelection }) => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
        endAdornment: (
          <InputAdornment position="end">
            <div style={{ pointerEvents: 'none' }}>
              {isOpen ? <ArrowDropUp color="default" /> : <ArrowDropDown color="default" />}
            </div>
            {!!selectedItem && (
              <IconButton color="default" onClick={handleClearSelection} aria-label="Clear selection">
                <Clear />
              </IconButton>
            )}
          </InputAdornment>
        ),
      })}
      focusOnClear
      onChange={action('onChange')}
    />
  ));

storiesOf('Input', module)
  .add('do not show menu on focus', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
        onFocus: null,
      })}
      onChange={action('onChange')}
    />
  ))
  .add('focusOnClear', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
      })}
      focusOnClear
      onChange={action('onChange')}
    />
  ))
  .add('blurOnSelect (using inputRef)', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
      })}
      blurOnSelect
      onChange={action('onChange')}
    />
  ));

storiesOf('List item', module)
  .add('default (text only)', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
      })}
      onChange={action('onChange')}
    />
  ))
  .add('styled text', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
      })}
      getListItem={({ getItemProps, item }) => (
        <ListItem button {...getItemProps()}>
          <ListItemText primary={<span style={{ color: 'red' }}>{item.label}</span>} />
        </ListItem>
      )}
      onChange={action('onChange')}
    />
  ))
  .add('left icon', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
      })}
      getListItem={({ getItemProps, item }) => (
        <ListItem button {...getItemProps()}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      )}
      onChange={action('onChange')}
    />
  ))
  .add('left avatar', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
      })}
      getListItem={({ getItemProps, item }) => (
        <ListItem button {...getItemProps()}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.label} />
        </ListItem>
      )}
      onChange={action('onChange')}
    />
  ))
  .add('secondary text', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
      })}
      getListItem={({ getItemProps, item }) => (
        <ListItem button {...getItemProps()}>
          <ListItemText primary={item.label} secondary="character" />
        </ListItem>
      )}
      onChange={action('onChange')}
    />
  ))
  .add('variable props', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
      })}
      getListItem={({ getItemProps, item }) => (
        <ListItem button {...getItemProps()}>
          <ListItemText primary={item.label} secondary={item.label.indexOf('e') !== -1 ? 'character' : undefined} />
        </ListItem>
      )}
      onChange={action('onChange')}
    />
  ))
  .add('all', () => (
    <StarWarsSelect
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
      })}
      getListItem={({ getItemProps, item }) => (
        <ListItem button {...getItemProps()}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.label} secondary="character" />
        </ListItem>
      )}
      onChange={action('onChange')}
    />
  ))
  .add('empty list (filtered)', () => (
    <StarWarsSelect
      items={[]}
      showEmpty
      getInputProps={() => ({
        label: 'Star Wars character',
        placeholder: 'Choose wisely',
      })}
      getListItem={({ getItemProps, item }) =>
        item ? (
          <ListItem button {...getItemProps()}>
            <ListItemText primary={item.label} />
          </ListItem>
        ) : (
          <ListItem button disabled>
            <ListItemText primary={<span style={{ fontStyle: 'italic' }}>No items found</span>} />
          </ListItem>
        )
      }
      onChange={action('onChange')}
    />
  ))
  .add('long text', () => (
    <StarWarsSelect
      getListItem={({ getItemProps, item }) => (
        <ListItem button {...getItemProps()}>
          <ListItemText primary={`${item.label} ${item.label} ${item.label} ${item.label}`} />
        </ListItem>
      )}
      onChange={action('onChange')}
    />
  ))
  .add('loading footer', () => {
    const loading = true;
    return (
      <MuiDownshift
        items={[{ label: 'one' }, { label: 'two' }, { label: 'three' }]}
        getListItem={({ getItemProps, item }) =>
          item ? (
            <ListItem button {...getItemProps()}>
              <ListItemText primary={item.label} />
            </ListItem>
          ) : (
            <ListItem button disabled>
              <ListItemText primary={<span style={{ fontStyle: 'italic' }}>Loading...</span>} />
            </ListItem>
          )
        }
        includeFooter
        loading={loading}
        isOpen
      />
    );
  });

storiesOf('Menu', module)
  .add('isOpen = true', () => <StarWarsSelect isOpen onChange={action('onChange')} />)
  .add('height by item count (3)', () => <StarWarsSelect menuItemCount={3} onChange={action('onChange')} />)
  .add('height by item count (10)', () => <StarWarsSelect menuItemCount={10} onChange={action('onChange')} />)
  .add('height by pixels (315)', () => <StarWarsSelect menuHeight={315} onChange={action('onChange')} />)
  .add('change z-index of root', () => (
    <div>
      <StarWarsSelect menuItemCount={3} onChange={action('onChange')} getRootProps={() => ({ style: { zIndex: 1 } })} />
      <div style={{ willChange: 'transform', background: '#ddd' }}>`will-change: &quot;transform&quot;` set</div>
    </div>
  ))
  .add('overlapping menus', () => (
    <div>
      <StarWarsSelect
        getInputProps={() => ({
          label: 'Star Wars character',
          placeholder: 'Choose wisely',
        })}
        onChange={action('onChange')}
      />
      <StarWarsSelect
        getInputProps={() => ({
          label: 'Star Wars character',
          placeholder: 'Choose wisely',
        })}
        onChange={action('onChange')}
      />
    </div>
  ))
  .add('menu direction', () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 16px)' }}>
      <StarWarsSelect
        getInputProps={() => ({
          label: 'Star Wars character',
          placeholder: 'Choose wisely',
        })}
        onChange={action('onChange')}
      />

      <div style={{ flex: 1 }} />

      <StarWarsSelect
        getInputProps={() => ({
          label: 'Star Wars character',
          placeholder: 'Choose wisely',
        })}
        onChange={action('onChange')}
      />
    </div>
  ))
  .add('on Dialog', () => (
    <Dialog open>
      <DialogTitle>Character select</DialogTitle>
      <DialogContent>
        <StarWarsSelect onChange={action('onChange')} />
      </DialogContent>
    </Dialog>
  ))
  .add('on Drawer', () => (
    <CustomDrawer open>
      <StarWarsSelect onChange={action('onChange')} />
    </CustomDrawer>
  ));

storiesOf('VirtualList', module)
  .add('static rowHeight (no CellMeasurer)', () => (
    <StarWarsSelect getVirtualListProps={() => ({ rowHeight: 48 })} onChange={action('onChange')} />
  ))
  .add('dynamic rowHeight (no CellMeasurer)', () => (
    <StarWarsSelect
      getListItem={({ getItemProps, item, index }) => (
        <ListItem button {...getItemProps()}>
          <ListItemText primary={item.label} secondary={index % 2 ? 'character' : undefined} />
        </ListItem>
      )}
      getVirtualListProps={() => ({
        rowHeight: ({ index }) => (index % 2 ? 72 : 48),
      })}
      onChange={action('onChange')}
    />
  ));
