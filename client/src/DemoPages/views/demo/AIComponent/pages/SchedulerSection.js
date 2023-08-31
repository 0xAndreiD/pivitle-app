const SchedulerSection = () => {
  return (
    <div className="wrapper wrapper-content">
    <div className="row animated fadeInDown">
      <div className="col-lg-3">
        <div className="ibox ">
          <div className="ibox-title">
            <h5>Draggable Events</h5>
            <div className="ibox-tools">
              <a className="collapse-link">
                <i className="fa fa-chevron-up"></i>
              </a>
              <a
                className="dropdown-toggle"
                data-toggle="dropdown"
                href="#"
              >
                <i className="fa fa-wrench"></i>
              </a>
              <ul className="dropdown-menu dropdown-user">
                <li>
                  <a href="#" className="dropdown-item">
                    Config option 1
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Config option 2
                  </a>
                </li>
              </ul>
              <a className="close-link">
                <i className="fa fa-times"></i>
              </a>
            </div>
          </div>
          <div className="ibox-content">
            <div id="external-events">
              <p>Drag a event and drop into callendar.11111111</p>
              <div className="external-event navy-bg">
                Go to shop and buy some products.
              </div>
              <div className="external-event navy-bg">
                Check the new CI from Corporation.
              </div>
              <div className="external-event navy-bg">
                Send documents to John.
              </div>
              <div className="external-event navy-bg">
                Phone to Sandra.
              </div>
              <div className="external-event navy-bg">
                Chat with Michael.
              </div>
              <p className="m-t">
                <input
                  type="checkbox"
                  id="drop-remove"
                  className="i-checks"
                  checked={true}
                  readOnly
                />
                <label htmlFor="drop-remove">remove after drop</label>
              </p>
            </div>
          </div>
        </div>
        <div className="ibox ">
          <div className="ibox-content">
            <h2>FullCalendar</h2> is a jQuery plugin that provides a
            full-sized, drag & drop calendar like the one below. It uses
            AJAX to fetch events on-the-fly for each month and is easily
            configured to use your own feed format (an extension is
            provided for Google Calendar).{" "}
            <p>
              <a href="http://arshaw.com/fullcalendar/" target="_blank">
                FullCalendar documentation
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-9">
        <div className="ibox ">
          <div className="ibox-title">
            <h5>Striped Table </h5>
            <div className="ibox-tools">
              <a className="collapse-link">
                <i className="fa fa-chevron-up"></i>
              </a>
              <a
                className="dropdown-toggle"
                data-toggle="dropdown"
                href="#"
              >
                <i className="fa fa-wrench"></i>
              </a>
              <ul className="dropdown-menu dropdown-user">
                <li>
                  <a href="#" className="dropdown-item">
                    Config option 1
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Config option 2
                  </a>
                </li>
              </ul>
              <a className="close-link">
                <i className="fa fa-times"></i>
              </a>
            </div>
          </div>
          <div className="ibox-content">
            <div id="calendar"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SchedulerSection;