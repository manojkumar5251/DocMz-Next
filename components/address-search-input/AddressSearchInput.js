import { Input } from "antd";
import React,  { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
// import "./AddressAutoComplete.css";

export default class AddressSearchInput extends Component{
  constructor(props){
      super(props);
      this.state = {
        address: props.address || ""
      };
  }

  handleAddressChange = (address) => {
    this.setState({ address });
  }

  componentDidUpdate(prevProps){
    if (prevProps.address !== this.props.address) {
        this.setState({ address: this.props.address });
    }
  }
  render() {
    const { address } = this.state;

    return (
      <PlacesAutocomplete onChange={this.handleAddressChange} onSelect={this.props.onAddressSelect} value={address}>
        {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
          <React.Fragment>
            <Input
              {...getInputProps({
                // id: "address-input",
                placeholder:"Search Location",
                
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading ? <div>Loading...</div> : null}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "active "
                  : "inActive";

                const spread = {
                  ...getSuggestionItemProps(suggestion, {
                    className
                  })
                };

                return (
                  <div {...spread} key={suggestion.id}>
                    <div>{suggestion.description}</div>
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        )}
      </PlacesAutocomplete>
    );
  }
}