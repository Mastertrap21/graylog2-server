import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-restricted-imports
import { InputGroup as BootstrapInputGroup } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import classNames from 'classnames';

const StyledBootstrapInputAddon = ({ className, ...rest }) => {
  return <BootstrapInputGroup.Addon bsClass={className} {...rest} />;
};

const Addon = ({ bsClass, className, ...addonProps }) => {
  const StyledAddon = styled(StyledBootstrapInputAddon)(({ theme }) => css`
    && {
      color: ${lighten(0.30, theme.color.primary.tre)};
      background-color: ${theme.color.primary.due};
      border-color: ${theme.color.secondary.tre};
    }
  `);

  return <StyledAddon className={classNames(bsClass, className)} {...addonProps} />;
};

const Button = ({ bsClass, className, ...addonProps }) => {
  return <BootstrapInputGroup.Button bsClass={classNames(bsClass, className)} {...addonProps} />;
};

const InputGroup = ({ bsClass, className, ...restProps }) => {
  return <BootstrapInputGroup bsClass={classNames(bsClass, className)} {...restProps} />;
};

InputGroup.Addon = Addon;
InputGroup.Button = Button;

StyledBootstrapInputAddon.propTypes = {
  className: PropTypes.string,
};

StyledBootstrapInputAddon.defaultProps = {
  className: undefined,
};

InputGroup.propTypes = {
  bsClass: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

InputGroup.defaultProps = {
  bsClass: 'input-group',
  className: undefined,
};

Addon.propTypes = {
  bsClass: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Addon.defaultProps = {
  bsClass: 'input-group-addon',
  className: undefined,
};

Button.propTypes = {
  bsClass: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  bsClass: 'input-group-btn',
  className: undefined,
};

/** @component */
export default InputGroup;
