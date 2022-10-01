import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <div>
        <header className="section-header">
          <section className="header-main border-bottom">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-2 col-4">
                  <a href="http://bootstrap-ecommerce.com" className="brand-wrap">
                    <img className="logo" src="assets/images/logo.png" />
                  </a> {/* brand-wrap.// */}
                </div>
                <div className="col-lg-6 col-sm-12">
                  <form action="#" className="search">
                    <div className="input-group w-100">
                      <input type="text" className="form-control" placeholder="Search" />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="fa fa-search" /> Search
                        </button>
                      </div>
                    </div>
                  </form> {/* search-wrap .end// */}
                </div> {/* col.// */}
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="widgets-wrap float-md-right">
                    <div className="widget-header  mr-3">
                      <a href="#" className="icon icon-sm rounded-circle border"><i className="fa fa-shopping-cart" /></a>
                      <span className="badge badge-pill badge-danger notify">0</span>
                    </div>
                    <div className="widget-header icontext">
                      <a href="#" className="icon icon-sm rounded-circle border"><i className="fa fa-user" /></a>
                      <div className="text">
                        <span className="text-muted">Welcome!</span>
                        <div>
                          <a href="#">Sign in</a> |
                          <a href="#"> Register</a>
                        </div>
                      </div>
                    </div>
                  </div> {/* widgets-wrap.// */}
                </div> {/* col.// */}
              </div> {/* row.// */}
            </div> {/* container.// */}
          </section> {/* header-main .// */}
        </header> {/* section-header.// */}
        <nav className="navbar navbar-main navbar-expand-lg navbar-light border-bottom">
          <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="main_nav">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Supermarket</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Partnership</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Baby &amp; Toys</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Fitness sport</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Clothing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Furnitures</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#"> More</a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Foods and Drink</a>
                    <a className="dropdown-item" href="#">Home interior</a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="#">Category 1</a>
                    <a className="dropdown-item" href="#">Category 2</a>
                    <a className="dropdown-item" href="#">Category 3</a>
                  </div>
                </li>
              </ul>
            </div> {/* collapse .// */}
          </div> {/* container .// */}
        </nav>
      </div>
      <section className="section-main bg padding-y">
        <div className="container">
          <div className="row">
            <aside className="col-md-3">
              <nav className="card">
                <ul className="menu-category">
                  <li><a href="#">Best clothes</a></li>
                  <li><a href="#">Automobiles</a></li>
                  <li><a href="#">Home interior</a></li>
                  <li><a href="#">Electronics</a></li>
                  <li><a href="#">Technologies</a></li>
                  <li><a href="#">Digital goods</a></li>
                  <li className="has-submenu"><a href="#">More items</a>
                    <ul className="submenu">
                      <li><a href="#">Submenu name</a></li>
                      <li><a href="#">Great submenu</a></li>
                      <li><a href="#">Another menu</a></li>
                      <li><a href="#">Some others</a></li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </aside> {/* col.// */}
            <div className="col-md-9">
              <article className="banner-wrap">
                <img src="assets/images/banners/2.jpg" className="w-100 rounded" />
              </article>
            </div> {/* col.// */}
          </div> {/* row.// */}
        </div> {/* container //  */}
      </section>

    </div>
  )
}
