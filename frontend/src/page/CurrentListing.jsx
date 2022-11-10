import PropTypes from 'prop-types';
import React from 'react';
// import BigButton from '../components/bigButton';
import fetchFunc from '../services/fetchRequest'
// import BigButton from '../components/bigButton';

const ListingNew = (props) => {
  const [listings, setListings] = React.useState([]);
  // const [newListingTitle, setNewListingTitle] = React.useState('');
  // console.log(props.token);

  // const newListing = async (args) => {
  //   const response = await fetchFunc('/listings/new', 'POST', args)
  //   const data = await response.json();
  //   if (data.error) {
  //     alert(data.error);
  //   } else if (props.token) {
  //     fetchListings();
  //   }
  // }

  const fetchListings = async () => {
    const response = await fetchFunc('/listings', 'GET')
    const data = await response.json();
    setListings(data.listings);
  }

  React.useEffect(() => {
    fetchListings();
  }, []);

  // print content
  return (
  <>
    <hr />
    Current listing:
    <br />
    {listings.map((listing, idx) => {
      console.log('this is: ', listing);
      return (
        <div key={idx}>
            Title: {listing.title}<br />
            Owner: {listing.owner}<br />
            Price: {listing.price}<br />
            <img src={listing.thumbnail} />
        </div>
      )
    })}
  </>
  );
}

export default ListingNew;

ListingNew.propTypes = {
  token: PropTypes.string,
};
