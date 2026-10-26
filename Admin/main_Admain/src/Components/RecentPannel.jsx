
export const RecentPannel = () => {
  return (
     <section class="panel mt-3">
            <div class="panel-header">
              <div>
                <h2 class="h5 mb-1 section-title"><i class="bi bi-people" aria-hidden="true"></i><span>Recent Users</span></h2>
                <p class="text-muted mb-0">Latest account activity across the workspace.</p>
              </div>
              <a class="btn btn-outline-secondary btn-sm" href="users.html">Manage Users</a>
            </div>
            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead><tr><th scope="col">User</th><th scope="col">Role</th><th scope="col">Team</th><th scope="col">Status</th><th scope="col">Joined</th><th scope="col" class="text-end">Action</th></tr></thead>
                <tbody>
                  <tr>
                    <td>
                      <div class="d-flex align-items-center gap-2">
                        <img class="avatar-img avatar-sm" src="../assets/images/avatar/avatar-1.jpg" alt="Sarah Ahmed"/>
                        <div>
                          <p class="fw-semibold mb-0">Sarah Ahmed</p>
                          <p class="text-muted small mb-0"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="592a382b3831193c21383429353c773a3634">[email&#160;protected]</a></p>
                        </div>
                      </div>
                    </td>
                    <td>Admin</td>
                    <td>Operations</td>
                    <td><span class="badge text-bg-success">Active</span></td>
                    <td>Jan 12, 2026</td>
                    <td class="text-end"><a class="btn btn-light btn-sm" href="user-details.html">View</a></td>
                  </tr>
                  <tr>
                    <td>
                      <div class="d-flex align-items-center gap-2">
                        <img class="avatar-img avatar-sm" src="../assets/images/avatar/avatar-2.jpg" alt="Rafi Khan"/>
                        <div>
                          <p class="fw-semibold mb-0">Rafi Khan</p>
                          <p class="text-muted small mb-0"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="384a595e51785d40595548545d165b5755">[email&#160;protected]</a></p>
                        </div>
                      </div>
                    </td>
                    <td>Manager</td>
                    <td>Sales</td>
                    <td><span class="badge text-bg-success">Active</span></td>
                    <td>Feb 03, 2026</td>
                    <td class="text-end"><a class="btn btn-light btn-sm" href="user-details.html">View</a></td>
                  </tr>
                  <tr>
                    <td>
                      <div class="d-flex align-items-center gap-2">
                        <img class="avatar-img avatar-sm" src="../assets/images/avatar/avatar-3.jpg" alt="Nadia Islam"/>
                        <div>
                          <p class="fw-semibold mb-0">Nadia Islam</p>
                          <p class="text-muted small mb-0"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="127c73767b7352776a737f627e773c717d7f">[email&#160;protected]</a></p>
                        </div>
                      </div>
                    </td>
                    <td>Editor</td>
                    <td>Content</td>
                    <td><span class="badge text-bg-warning">Pending</span></td>
                    <td>Mar 18, 2026</td>
                    <td class="text-end"><a class="btn btn-light btn-sm" href="user-details.html">View</a></td>
                  </tr>
                  <tr>
                    <td>
                      <div class="d-flex align-items-center gap-2">
                        <img class="avatar-img avatar-sm" src="../assets/images/avatar/avatar-4.jpg" alt="Mina Torres"/>
                        <div>
                          <p class="fw-semibold mb-0">Mina Torres</p>
                          <p class="text-muted small mb-0"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="4e2327202f0e2b362f233e222b602d2123">[email&#160;protected]</a></p>
                        </div>
                      </div>
                    </td>
                    <td>Viewer</td>
                    <td>Finance</td>
                    <td><span class="badge text-bg-secondary">Suspended</span></td>
                    <td>Apr 07, 2026</td>
                    <td class="text-end"><a class="btn btn-light btn-sm" href="user-details.html">View</a></td>
                  </tr>
                  <tr>
                    <td>
                      <div class="d-flex align-items-center gap-2">
                        <img class="avatar-img avatar-sm" src="../assets/images/avatar/avatar-5.jpg" alt="Jon Oliver"/>
                        <div>
                          <p class="fw-semibold mb-0">Jon Oliver</p>
                          <p class="text-muted small mb-0"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="cfa5a0a18faab7aea2bfa3aae1aca0a2">[email&#160;protected]</a></p>
                        </div>
                      </div>
                    </td>
                    <td>Analyst</td>
                    <td>Data</td>
                    <td><span class="badge text-bg-success">Active</span></td>
                    <td>Apr 22, 2026</td>
                    <td class="text-end"><a class="btn btn-light btn-sm" href="user-details.html">View</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
  )
}
