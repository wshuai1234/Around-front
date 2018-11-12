import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps";
import {POS_KEY} from "../constant"
import {AroundMarker} from './AroundMarker.js';
export class AroundMap extends React.Component{
    reloadMarkers = () => {
        console.log('reloadMarkers');
        const center = this.map.getCenter();
        const range = this.getRange();
        console.log(range);
        // call home.js 's loadNearbyPosts(location, range)
        const location = {
            lat: center.lat(),
            lon:center.lng()
        }
        this.props.loadNearbyPosts(location, range);
    }
    getRange = () => {
        const google = window.google;
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();
        if (center && bounds) {
            const ne = bounds.getNorthEast();
            const right = new google.maps.LatLng(center.lat(), ne.lng());
            return 0.001 * google.maps.geometry.spherical.computeDistanceBetween(center, right);
        }
    }


    getMapRef = (map) => {
        this.map = map;
        window.map = map;
    }

    render(){
        const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
        return (
            <GoogleMap
                ref={this.getMapRef}
                onDragEnd={this.reloadMarkers}
                onZoomChanged={this.reloadMarkers}
                defaultZoom={11}
                defaultCenter={{ lat: lat, lng:lon }}
            >
                {
                    this.props.posts.map(
                        (post) => (<AroundMarker
                            key={post.url}
                            post={post}
                        />)
                    )
                }


            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));