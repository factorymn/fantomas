import React, { Component, PropTypes as Type } from 'react';
import './DateRange.styl';
import _get from 'lodash/get';
import DayPicker, { DateUtils } from 'react-day-picker';
import DateTime from 'luxon/src/datetime.js'
// import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import bemCn from 'bem-cn-fast';
const b = bemCn('date-range');
const defaultRangeLabels = {
  from: 'с',
  to: 'по',
}

export default class DateRange extends Component {

  static propTypes = {
  }

  state = {
    range: {
      from: null,
      to: null,
    }
  };

  static defaultProps = {
    numberOfMonths: 2,
  };
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
  }
  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state.range);
    this.setState({ range });
    this.props.onChange(range);
  }

  componentDidMount() {
    const { value } = this.props;
    console.log(value);
    this.setState({ range: {
      from: new Date(_get(value, 'from')),
      to: new Date(_get(value, 'to'))
    }});
  }

  getDate() {
    const { range } = this.state;
    let from = range.from && DateTime.fromJSDate(range.from);
    from = (from && !from.invalid) ? from.setLocale('ru').setZone('Europe/Moscow').toFormat('dd.MM.yyyy') : '';
    let to = range.to && DateTime.fromJSDate(range.to);
    to = (to && !to.invalid) ? to.setLocale('ru').setZone('Europe/Moscow').toFormat('dd.MM.yyyy') : '';
    return {
      from,
      to,
    }
  }

  render() {
    const { label } = this.props;
    const { from, to } = this.state.range;
    const modifiers = { start: from, end: to };
    const rangeDatesForLabels = this.getDate();
    return (
      <div className={b()}>
        <div className={b('label')}>{label}</div>
        <div className={b('range')}>
          <div className={b('date')}>{defaultRangeLabels.from} {rangeDatesForLabels.from}</div>
          <div className={b('date')}>{defaultRangeLabels.to} {rangeDatesForLabels.to}</div>
        </div>
        <DayPicker
          className="Selectable"
          pagedNavigation
          showOutsideDays
          numberOfMonths={2}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}
