import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, Animated } from 'react-native';

export default class Movie extends Component {
	
	state = {
		visible: false,
		x: new Animated.Value(0),
	};
	
	slide = () => {
		Animated.spring(this.state.x, {
			toValue: this.state.visible ? 0 : -200,
			useNativeDriver: true
		}).start(({ finished }) => {
			if(finished) {
				this.setState({ visible: !this.state.visible });
			}
		});
	};

	render() {
		const imageName = 'https://image.tmdb.org/t/p/w500' + this.props.movie.poster_path;
		const height = this.props.width / this.props.aspectRatio;
		const leftPoster = -20;
		const leftDetails = -(this.props.width + leftPoster);

		return (
			<View style={styles.container}>

				<Text style={styles.title}>{this.props.movie.title}</Text>

				<View style={{flexDirection: 'row', justifyContent: 'center'}}>
				
					<Animated.View style={{zIndex: 1, transform: [{rotateY: '-10deg'}, {translateX: this.state.x}]}} >
						<Pressable onPress={this.slide}>
							<Image
								style={{ width: this.props.width, height: height, borderRadius: 16 }}
								source={{ uri: imageName }}
								resizeMode={'cover'}
							/>
						</Pressable>
					</Animated.View>

					<View style={{position: 'relative'}}>
						<View style={[styles.descriptionContainer, { left: leftDetails, height: height, width: this.props.width, minWidth: 155 }]}>
							<View style={{ marginBottom: 6 }}>
								<Text style={{color: 'white'}}>{this.props.movie.original_title}</Text>
							</View>

							<View style={{ flexDirection: 'row', marginBottom: 6 }}>
								<Text style={[styles.descriptionText, { marginRight: 12 }]}>
									{this.props.movie.release_date.split('-').reverse().reduce((prev, curr) => prev + '/' + curr)}
								</Text>

								<Text style={styles.descriptionText}>⭐ {this.props.movie.vote_average}</Text>
							</View>

							<ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
								<Text style={[styles.descriptionText, { textAlign: 'justify', marginBottom: 20 }]}>{this.props.movie.overview}</Text>
							</ScrollView>
						</View>
					</View>

				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#222',
		borderRadius: 16,
		width: "100%",
		marginVertical: 8,
	},
	title: {
		color: 'white',
		textAlign: 'center',
		fontSize: 18,
		padding: 6
	},
	descriptionContainer: {
		position: 'absolute',
		backgroundColor: '#555',
		borderWidth: 1,
		borderRadius: 16,
		borderColor: 'grey',
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	descriptionText: {
		color: 'white',
	}
});
