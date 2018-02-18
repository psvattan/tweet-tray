import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import withRenderer from '../containers/withRenderer';
import InnerContent from './InnerContent';
import ListView from './ListView';

import * as constants from '../constants';

const SettingsStyle = Styled.section`
    overflow: hidden;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 99;
    width: 100%;
    height: 100%;
    background-color: ${constants.OPAQUE_BLACK};

    &.hidden {
      display:none;
    }

    &:hover {
      cursor: pointer;
    }
`;

class Settings extends Component {
  static propTypes = {
    showSettings: PropTypes.bool.isRequired,
    onToggleSettingsVisibility: PropTypes.func.isRequired,
    colorTheme: PropTypes.string.isRequired,
    onToggleColorTheme: PropTypes.func.isRequired,
    shouldLogout: PropTypes.func.isRequired,
    locales: PropTypes.object.isRequired,
    renderer: PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    const {
      showSettings,
      onToggleSettingsVisibility,
      colorTheme,
      onToggleColorTheme,
      shouldLogout,
      locales,
      renderer,
    } = this.props;

    return (
      <SettingsStyle
        className={`${showSettings ? '' : 'hidden'}`}
        onClick={() => { onToggleSettingsVisibility(false); }}
      >
        <InnerContent
          style={{
            position: 'relative',
            top: '0px',
            left: '0px',
            padding: '0px',
            minHeight: '100%',
          }}
        >
          <ListView
            dataSource={
              [{
                title: colorTheme === 'day' ? locales.settings.night_mode_enable_action : locales.settings.night_mode_disable_action,
                action: (e) => {
                  e.stopPropagation();
                  onToggleColorTheme(colorTheme === 'day' ? 'night' : 'day');
                  onToggleSettingsVisibility(false);
                },
              }, {
                title: locales.settings.quit_action,
                action: (e) => {
                  e.stopPropagation();
                  renderer.send('quitApplication');
                },
              }, {
                title: locales.settings.log_out_action,
                action: (e) => {
                  e.stopPropagation();
                  onToggleSettingsVisibility(false);
                  this.context.router.history.replace('/');
                  shouldLogout();
                },
                type: 'warning',
              }, {
                title: locales.settings.cancel_action,
                action: (e) => {
                  e.stopPropagation();
                  onToggleSettingsVisibility(false);
                },
                type: 'last',
              }, ]
            }
          />
        </InnerContent>
      </SettingsStyle>
    );
  }
}

export default withRenderer(Settings);

