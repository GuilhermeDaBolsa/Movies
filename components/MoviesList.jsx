import { StyleSheet, Text, ScrollView } from 'react-native';
import Movie from './Movie';

export default function MoviesList(props) {

	return (
		<ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}} nestedScrollEnabled={true}>
			{props.movies.map(movie => <Movie width={200} aspectRatio={3/5} movie={movie} key={movie.id}/>)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
	},
});
