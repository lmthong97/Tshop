import Contact from 'features/Contact'
import HomePage from 'features/HomePage'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import NotFound from './components/NotFound'
import Product from './features/Product'
import CartFeature from './features/Cart'
// const theme = createTheme();
function App() {
  return (
    // <ThemeProvider theme={theme}>
    <div className="App">
      <BrowserRouter>
        <Header />

        <Switch>
          <Redirect from="/home" to="/" exact />

          <Route path="/" component={HomePage} exact />
          <Route path="/products" component={Product} />
          <Route path="/cart" component={CartFeature} />
          <Route path="/contact" component={Contact} />

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
    // </ThemeProvider>
  )
}

export default App
