import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import  { addUpdateTrip }  from '../store/trips'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

import AutoComInput from "./GoogleAutoComplete"

const initialState = {
    destination: '',
    startDate: new Date(),
    endDate: new Date(),
    name: '',
    purpose: '',
    address:''
}
class CreateTrip extends Component{
  constructor(props){
    super(props)
    this.state = {
        initialState,
        address: '',
        name: '',
        startDate: "",
        endDate: "",
        errorMessage: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.handleChanges = this.handleChanges.bind(this)
    // this.handleSelect = this.handleSelect.bind(this)
    this.handleDate = this.handleDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
  }

  handleSubmit = async (ev) => {
    ev.preventDefault();
    const {state} = this
    if (state.endDate <= state.startDate){
      this.setState({errorMessage: 'Error: Start date should be before the end date.'})
      return;
    };
    try {
        await this.props.addUpdateTrip({
            destination: document.getElementById("in").value,
            startDate: moment(state.startDate),
            endDate: moment(state.endDate),
            purpose: state.purpose,
            name: state.name,
            ownerId:this.props.auth.id,
        })
        console.log(this.props)

    this.props.history.push('/tripattendees')

    } catch (error) {
        console.log(error)
    }
}

handleChange = (ev) => {
if(ev.target.name!=="address") {
  this.setState({[ev.target.name]:ev.target.value})
  
}
}


handleDate = start => {
    this.setState({
        startDate: start
      })
}

handleEndDate = end => {
  this.setState({
      startDate: end
    })
}    

onFormSubmit(e) {
  e.preventDefault();

}
 
// handleSelect = address => {
//     console.log(address)
//   geocodeByAddress(address)
//     .then(results => getLatLng(results[0]))
//     .then(latLng => {
//       console.log('Success', latLng);
//       this.setState({ address })
//     })
//     .catch(error => console.error('Error', error));
// };

updateDate = () => {
  const today = new Date(); 
  console.log(`
  Default time zone: ${format(today, 'yyyy-MM-dd HH:mm:ss')}
  }`);
}

  //updatedwork
 
render() {
    const { handleSubmit, handleChange} = this;
    const { destination, startDate, endDate, purpose, name} = this.state
    return ( 
     <div id="content-wrapper">
        <div id="fb-root"></div>
        <div id="profilecontainer">
          <div className="containerx" id="profileleft">
            <h1 className="profilehdr">Create Trip</h1>
          </div>
          <div className="containerx" id="profileright">
            <form id="profileform" onSubmit={handleSubmit}>
            <div className='formfield'>
                <input type="text" name='name' value= {name} onChange={ handleChange }
                  required={true} autoFocus placeholder="Enter a name"/>
                <label>Name:</label>
            </div>
            <div className='formfield'>
            <AutoComInput className='location-search-input' onChange={handleChange}  />
                  <label>Destination:</label>
                    {/* <input type="text" name='destination' value= {destination} onChange={ handleChange }
                    required={true} /> */}
                    {/* <PlacesAutocomplete
                      value={this.state.address}
                      onChange={handleChanges}
                      onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='formfield'>
            <input 
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            //   name='destination'
            //   onChange={handleChanges}
               className='formfield'
              value= { this.state.address }
            />
                            <label>Destination:</label>

            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div 
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })} key={suggestion.placeId}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete> */}
                    
                </div>
                <div className='formfield'> 
                    <input type="date" name='startDate' value= {startDate} onChange={ handleChange }
                    required={true} />
                    {/* <DatePicker
              selected={ this.state.startDate }
              onChange={ this.handleDate }
              name="startDate"
              dateFormat="MM/dd/yyyy"
              minDate={moment().toDate()}
          /> */}
                    <label>Start Date:</label>
                </div>
                <div className='formfield'>
                    <input type="date" name='endDate' value= {endDate} onChange={ handleChange }
                    required={true}/>
                     <label>End Date:</label>
                     {/* <DatePicker
              selected={ this.state.endDate }
              onChange={ this.handleEndDate }
              name="endDate"
              dateFormat="MM/dd/yyyy"
              minDate={moment().toDate()}
          /> */}
                </div>
                <div className='formfield'>
                    <select name='purpose' defaultValue ="Pick a purpose" value= {purpose} onChange={ handleChange }>
                    <option value="">Pick a purpose</option>
                       <option value="VACATION">Vacation</option>
                     <option value="BUSINESS">Business</option>
                    <option value="REUNION">Reunion</option>
                     <option value="RELAX">Relax</option>
                     <option value="OTHER">Other</option>
                    </select>
                    <label>Purpose:</label>
                </div>
                <div className="buttons">
                <button type="submit" className="" onChange={ handleSubmit }>Create Trip</button>
                <br/>
                { this.state.errorMessage }
                {/* <Link to="/tripattendees"><button>Add Trip Attendeese</button></Link> */}
                </div>
            </form>
            </div>
            <br/>
        </div>
        {/* <TripMap /> */}
    </div>
     );
}
};

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = {
    addUpdateTrip
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTrip);