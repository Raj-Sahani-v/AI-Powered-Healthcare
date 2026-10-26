
export const DashboardMatrix = () => {
  return (

        <section class="row g-3 mt-1" aria-label="Dashboard metrics">
            <div class="col-12 col-sm-6 col-xl-3">
              <article class="metric-card metric-primary">
                <div class="metric-top">
                  <span class="metric-label">Total Doctor</span>
                  <span class="metric-icon"><i class="bi bi-currency-dollar" aria-hidden="true"></i></span>
                </div>
                <div class="metric-value">2</div>
                <div class="metric-meta">
                  <span class="text-success">+12.5%</span>
                  <span>from last month</span>
                </div>
              </article>
            </div>

            <div class="col-12 col-sm-6 col-xl-3">
              <article class="metric-card metric-success">
                <div class="metric-top">
                  <span class="metric-label">Pending</span>
                  <span class="metric-icon"><i class="bi bi-bag-check" aria-hidden="true"></i></span>
                </div>
                <div class="metric-value">1</div>
                <div class="metric-meta">
                  <span class="text-success">+8.2%</span>
                  <span>new orders</span>
                </div>
              </article>
            </div>

            <div class="col-12 col-sm-6 col-xl-3">
              <article class="metric-card metric-warning">
                <div class="metric-top">
                  <span class="metric-label">Approved</span>
                  <span class="metric-icon"><i class="bi bi-people" aria-hidden="true"></i></span>
                </div>
                <div class="metric-value">1</div>
                <div class="metric-meta">
                  <span class="text-success">+5.1%</span>
                  <span>active users</span>
                </div>
              </article>
            </div>

            <div class="col-12 col-sm-6 col-xl-3">
              <article class="metric-card metric-danger">
                <div class="metric-top">
                  <span class="metric-label">Suspend</span>
                  <span class="metric-icon"><i class="bi bi-life-preserver" aria-hidden="true"></i></span>
                </div>
                <div class="metric-value">0</div>
                <div class="metric-meta">
                  <span class="text-danger"></span>
                  <span> </span>
                </div>
              </article>
            </div>
          </section>

  )
}
