import React, {Component} from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'

class Param extends Component {
    state = {
        id: '',
        param: '',
    }
  
    onParamChange = e => {
        const param = e.target.value
        this.setState({ param }, this.props.addParam(this.state))
    }
  
    onIdChange = e => {
        const id = e.target.value
        this.setState({ id })
    }
  
    clearInput = () => {
        this.setState({ param: '' })
        this.setState({ id: '' })
  }
  
    render() {
        return (
          <div className="flex flex-col bg-slate-700  items-center gap-6">
            <div className=" w-72 flex justify-between mt-6 items-center">
                <label htmlFor="id" className="text-slate-50" >ID</label>
                <input type="number" className="py-2 px-2 rounded-lg"  placeholder="any number" name="id" value={this.state.id} onChange={this.onIdChange} />
            </div>
            <div className=" w-72 flex justify-between items-center">
                <label htmlFor="param" className="text-slate-50">Param</label>
                <input
                    type="text"
                    placeholder="param"
                    className="py-2 px-2 rounded-lg"
                    name="param"
                    value={this.state.param}
                    onChange={this.onParamChange}
                />
          </div>
  
          <ParamValue id={this.state.id} addParamValues={this.props.addParamValues} clearInput={this.clearInput}/>
        </div>
      )
    }
  }
  
  class ParamValue extends Component {
    state = {
      paramValue: '',
      id: '',
    }
  
    onParamValueChange = e => {
      const paramValue = e.target.value
      this.setState({ paramValue })
      this.setState({ id: this.props.id })
    }
  
    clearInput = () => {
      this.setState({ paramValue: '' })
      this.setState({ id: '' })
      this.props.clearInput()
    }
  
    handleClick = () => {
      this.props.addParamValues(this.state)
      this.clearInput()
    }
  
    render() {
      return (
        <div>
          <div className="w-72 flex justify-between items-center">
            <label htmlFor="paramValue" className="text-slate-50" >ParamValue</label>
            <input type="text"  className="py-2 px-2 rounded-lg" placeholder="paramValue" name="paramValue" onChange={this.onParamValueChange} value={this.state.paramValue}/>
          </div>
          <button onClick={this.handleClick}  className="my-6 text-slate-50 w-full border-solid border-2 border-slate-50 py-1 rounded-lg">ADD PARAMS</button>
        </div>
      )
    }
  }
  
  class Model extends Component {
    renderParamValue = arr => {
      return arr.map(item => {
        return (
            <tr key={item.id}>
            <td className="border border-slate-700 text-center text-slate-700">
               {item.id}
            </td>
              <td className="border border-slate-700 text-center text-slate-700">
                 {item.paramValue}
              </td>
            </tr>
        )
      })
    }
    render() {
      return (
        <div className="w-72">
          <table className="w-full border border-slate-700">
            <thead className="border-slate-700">
            <tr>
              <th className="border border-slate-700">id</th>
              <th className="border border-slate-700">paramValue</th>
            </tr>
            </thead>
            <tbody className="border-slate-700">
            {this.renderParamValue(this.props.paramsValues)}
            </tbody>
          </table>
  
        </div>
      )
    }
  }
  
  class ParamEditor extends Component {
    state = {
      paramValue: [],
      param: [],
      getModel: false,
    }
  
    addParam = val => {
      this.setState({ param: [...this.state.param, val] }, () => {})
    }
  
    addParamValues = val => {
      this.setState({ paramValue: [...this.state.paramValue, val] }, () => {})
    }
  
    handleModel = () => {
      this.setState({ getModel: true }, () => {})
    }
  
    render() {
      return (
        <div className="flex flex-col gap-10">
          <Param addParam={this.addParam} addParamValues={this.addParamValues} />
          <div className="flex flex-col gap-10 items-center">
            <button className="w-72 my-6 text-slate-700  border-solid border-2 border-slate-700 py-1 rounded-lg" onClick={this.handleModel}>GET MODEL</button>
            {this.state.getModel ? this.props.render(this.state.paramValue) : null}
          </div>
        </div>
      )
    }
  }
  
  class App extends Component {
    render() {
      return <ParamEditor render={paramsValues => <Model paramsValues={paramsValues} />} />
    }
  }

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
