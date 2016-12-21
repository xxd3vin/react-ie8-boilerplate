
import React, { Component, PropTypes } from 'react';

import DatePicker from '../components/DatePicker'; //from 'react-bootstrap-date-picker';

class PortalDatePicker extends Component {
  static propTypes = {
    //handleCreate: PropTypes.func.isRequired,
    //handleUpdate: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };
  state = {
    value: this.props.value || ''
  };

  constructor(props) {
    super(props);
  }

  handleDateChange(value, formattedValue) {
    this.setState({ value, formattedValue })
    if (this.props.onChange) {
      this.props.onChange(value, formattedValue)
    }
  }

  render() {
    const datePickerStyle = {
      width: '150px'
    }
    const dateFormat = 'YYYY-MM-DD';
    const dayLabels = ['日', '一', '二', '三', '四', '五', '六'];
    const monthLabels = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    const datePickerPlaceholder = '年-月-日';

    const formControl = (
      <input
        type="text"
        style={datePickerStyle}
      />
    )

    return (
      <DatePicker
        style={datePickerStyle}
        value={this.state.value}
        dateFormat={dateFormat}
        dayLabels={dayLabels}
        monthLabels={monthLabels}
        placeholder={datePickerPlaceholder}
        onChange={::this.handleDateChange}
        customControl={formControl}
      />
    );
  }
};

export default PortalDatePicker;
