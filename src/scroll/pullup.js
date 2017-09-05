import {requestAnimationFrame, cancelAnimationFrame} from '../util/raf'

export function pullUpMixin(BScroll) {
  BScroll.prototype._initPullUp = function () {
    // must watch scroll in real time
    this.options.probeType = 3

    this.pullupWatching = false
    this._watchPullUp()
  }

  BScroll.prototype._watchPullUp = function () {
    if (this.pullupWatching) {
      return
    }
    this.pullupWatching = true
    const {threshold = 0} = this.options.pullUpLoad

    this.on('scroll', checkToEnd)

    function checkToEnd(pos) {
      if (pos.y <= (this.maxScrollY + threshold)) {
        this.trigger('pullingUp')
        this.pullupWatching = false
        this.off('scroll', checkToEnd)
      }
    }
  }

  BScroll.prototype.finishPullUp = function () {
    cancelAnimationFrame(this.watchTimer)
    this.watchTimer = requestAnimationFrame(() => {
      this._watchPullUp()
    })
  }
}
