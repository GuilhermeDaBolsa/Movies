import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MoviesList from './components/MoviesList';

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_FIXED_PARAMS = "?api_key=35087424f2c405bdc8067e12bdfc7b48&include_adult=false&language=pt-BR"

export default function App() {
	const [loadingMovies, setLoadingMovies] = useState(false);
	const [movies, setMovies] = useState(null);
	const [text, setText] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	async function searchMovies() {
		if(text == "")
			return;

		setLoadingMovies(true);

		try{
			const rawResponse = await fetch(API_URL + API_FIXED_PARAMS + "&query=" + text.replace(' ', '+'));
			const response = await rawResponse.json() ?? {};
			setMovies(response);
		}catch(error) {
			setErrorMessage("Houve um erro ao buscar os filmes :(\n" + error.msg);
		}

		setLoadingMovies(false);
	}

	return (
		<SafeAreaView style={styles.container}>
			
			<View style={{flex: 1, alignItems: "center" }}>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.inputText}
						onChangeText={setText}
						placeholder='Pesquise por filmes'
						placeholderTextColor="#888"
						value={text}
					/>

					<Pressable style={{ backgroundColor: '#333', height: '100%', padding: 4}} onPress={searchMovies}>
						<Text style={{color: '#eee'}}>BUSCAR</Text>
					</Pressable>
				</View>

				<View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%" }}>
					{
						loadingMovies ? <Text style={{color: '#eee'}}>Carregando...</Text>
							: errorMessage != "" ? <Text style={{color: '#eee'}}>{errorMessage}</Text>
								: movies != null ?
									(movies.results.length > 0 ? <MoviesList movies={movies.results}/>
										: <Text style={{color: '#eee'}}>Não encontrei resultados</Text>)
								: ''
					}
				</View>

			</View>
			
		<StatusBar style="auto" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
	inputContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		maxWidth: 280,
		borderBottomWidth: 1,
		padding: 4,
		borderColor: 'white'
	},
	inputText: {
		flex: 1,
		color: '#eee',
		paddingHorizontal: 4,
	}
});
