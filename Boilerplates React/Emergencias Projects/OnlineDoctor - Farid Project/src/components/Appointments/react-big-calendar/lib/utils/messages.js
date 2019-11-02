"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = messages;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var defaultMessages = {
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  allDay: 'Todo el día',
  week: 'Semana',
  work_week: 'Días hábiles',
  day: 'Día',
  month: 'Mes',
  previous: 'Anterior',
  next: 'Siguiente',
  yesterday: 'Ayer',
  tomorrow: 'Mañana',
  today: 'Hoy',
  agenda: 'Agenda',
  noEventsInRange: 'No hay eventos en este rango',
  showMore: function showMore(total) {
    return "+" + total + " more";
  }
};

function messages(msgs) {
  return (0, _extends2.default)({}, defaultMessages, msgs);
}

module.exports = exports["default"];