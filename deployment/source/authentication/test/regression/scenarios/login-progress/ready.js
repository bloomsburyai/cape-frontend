module.exports = function(chromy, scenario, vp) {
  chromy
    .type('input[placeholder="Username"]', 'test')
    .type('input[placeholder="Password"]', 'test')
    .click('.btn-primary')
    .wait('.fa-spin')
}
