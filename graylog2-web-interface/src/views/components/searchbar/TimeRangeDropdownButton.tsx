/*
 * Copyright (C) 2020 Graylog, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Server Side Public License, version 1,
 * as published by MongoDB, Inc.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Server Side Public License for more details.
 *
 * You should have received a copy of the Server Side Public License
 * along with this program. If not, see
 * <http://www.mongodb.com/licensing/server-side-public-license>.
 */
import * as React from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';

import type { TimeRange, NoTimeRangeOverride } from 'views/logic/queries/Query';
import { ButtonGroup } from 'components/bootstrap';
import { normalizeIfAllMessagesRange } from 'views/logic/queries/NormalizeTimeRange';
import useSearchConfiguration from 'hooks/useSearchConfiguration';

import RangePresetDropdown from './RangePresetDropdown';
import TimeRangeButton from './TimeRangeButton';

type Props = {
  disabled?: boolean,
  hasErrorOnMount?: boolean,
  onPresetSelectOpen: () => void,
  setCurrentTimeRange: (nextTimeRange: TimeRange | NoTimeRangeOverride) => void,
  toggleShow: () => void,
  showPresetDropdown?: boolean,
};

const StyledRangePresetDropdown = styled(RangePresetDropdown)`
  padding: 6px;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  display: flex;
  align-items: start;
`;

const TimeRangeDropdownButton = ({
  disabled,
  hasErrorOnMount,
  onPresetSelectOpen,
  setCurrentTimeRange,
  showPresetDropdown = true,
  toggleShow,
}: Props) => {
  const { submitForm, isValid } = useFormikContext();
  const { config } = useSearchConfiguration();
  const availableOptions = config?.quick_access_timerange_presets;

  const _onClick = (e) => {
    e.currentTarget.blur();
    toggleShow();
  };

  const selectRelativeTimeRangePreset = (timerange) => {
    setCurrentTimeRange(normalizeIfAllMessagesRange(timerange));

    if (isValid) {
      submitForm();
    }
  };

  const _onPresetSelectToggle = (open: boolean) => {
    if (open) {
      onPresetSelectOpen();
    }
  };

  return (
    <StyledButtonGroup>
      <TimeRangeButton hasError={hasErrorOnMount}
                       disabled={disabled}
                       onClick={_onClick} />
      {showPresetDropdown
        && (
          <StyledRangePresetDropdown disabled={disabled}
                                     displayTitle={false}
                                     onChange={selectRelativeTimeRangePreset}
                                     onToggle={_onPresetSelectToggle}
                                     header="Select time range"
                                     bsSize={null}
                                     availableOptions={availableOptions} />
        )}
    </StyledButtonGroup>
  );
};

TimeRangeDropdownButton.defaultProps = {
  hasErrorOnMount: false,
  disabled: false,
  showPresetDropdown: true,
};

export default TimeRangeDropdownButton;
