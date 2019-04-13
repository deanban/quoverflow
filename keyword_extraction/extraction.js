const _ = require('underscore')
const supported_languages = ['english']
const stopwords = require('./stopwords')

_.str = require('underscore.string')

function extract(str, options) {
	if (_.isEmpty(str)) {
		return []
	}
	if (_.isEmpty(options)) {
		options = {
			remove_digits: true,
			return_changed_case: true
		}
	}
	const return_changed_case = options.return_changed_case
	const return_chained_words = options.return_chained_words
	const remove_digits = options.remove_digits
	const language = options.language || 'english'
	const remove_duplicates = options.remove_duplicates || false
	const return_max_ngrams = options.return_max_ngrams

	if (supported_languages.indexOf(language) < 0) {
		throw new Error(
			'Language must be one of [' + supported_languages.join(',') + ']'
		)
	}

	//  strip any HTML and trim whitespace
	let text = _.str.trim(_.str.stripTags(str))
	if (_.isEmpty(text)) {
		return []
	} else {
		let words = text.split(/\s/)
		let unchanged_words = []
		let low_words = []
		//  change the case of all the words
		for (let x = 0; x < words.length; x++) {
			//  remove periods, question marks, exclamation points, commas, and semi-colons
			let w = words[x].match(/https?:\/\/.*[\r\n]*/g)
				? words[x]
				: words[x].replace(/\.|,|;|!|\?|\(|\)|:|"|^'|'$|“|”|‘|’/g, '')
			//  if this is a short result, make sure it's not a single character or something 'odd'
			if (w.length === 1) {
				w = w.replace(/-|_|@|&|#/g, '')
			}
			//  if it's a number, remove it
			let digits_match = w.match(/\d/g)
			if (remove_digits && digits_match && digits_match.length === w.length) {
				w = ''
			}
			if (w.length > 0) {
				low_words.push(w.toLowerCase())
				unchanged_words.push(w)
			}
		}
		let results = []
		let stopwords = options.stopwords || _getStopwords({ language: language })
		let last_result_word_index = 0
		let start_result_word_index = 0
		let unbroken_word_chain = false
		for (let y = 0; y < low_words.length; y++) {
			if (stopwords.indexOf(low_words[y]) < 0) {
				if (last_result_word_index !== y - 1) {
					start_result_word_index = y
					unbroken_word_chain = false
				} else {
					unbroken_word_chain = true
				}
				let result_word =
					return_changed_case &&
					!unchanged_words[y].match(/https?:\/\/.*[\r\n]*/g)
						? low_words[y]
						: unchanged_words[y]

				if (
					return_max_ngrams &&
					unbroken_word_chain &&
					!return_chained_words &&
					return_max_ngrams > y - start_result_word_index &&
					last_result_word_index === y - 1
				) {
					let change_pos = results.length - 1 < 0 ? 0 : results.length - 1
					results[change_pos] = results[change_pos]
						? results[change_pos] + ' ' + result_word
						: result_word
				} else if (return_chained_words && last_result_word_index === y - 1) {
					let change_pos = results.length - 1 < 0 ? 0 : results.length - 1
					results[change_pos] = results[change_pos]
						? results[change_pos] + ' ' + result_word
						: result_word
				} else {
					results.push(result_word)
				}

				last_result_word_index = y
			} else {
				unbroken_word_chain = false
			}
		}

		if (remove_duplicates) {
			results = _.uniq(results, function(item) {
				return item
			})
		}

		return results
	}
}

function _getStopwords(options) {
	options = options || {}

	let language = options.language || 'english'
	if (supported_languages.indexOf(language) < 0) {
		throw new Error(
			'Language must be one of [' + supported_languages.join(',') + ']'
		)
	}

	return stopwords[language]
}

module.exports = {
	extract: extract,
	getStopwords: _getStopwords
}

/***************************************************************
                         DEBUGGER CODES
***************************************************************/

// const sentence =
// 	'What do you think about the new pictures from the Event Horizon Telescope?'

// let extraction_result = extract(sentence, {
// 	language: 'english',
// 	remove_digits: true,
// 	return_changed_case: false,
// 	remove_duplicates: false
// })
// console.log(extraction_result.join(' ').toString())
