import React, {Component} from 'react';
import KeyField from './KeyField';
import ValueField from './ValueField';
import PropTypes from 'prop-types';
import FieldSubmitButton from 'components/Buttons/FieldSubmitButton';
import CategoriseTransaction from 'api/CategoriseTransaction';
import Message from 'Message';
import LoadTransaction from 'api/LoadTransaction';
import {connect} from 'react-redux';
import InitializeSelectors from 'actions/MaterializeInitializers/InitializeSelectors';

@connect((store) => {
    return {
        transaction: store.transaction.transaction,
        fetched: store.transaction.fetched
    }
})

class KeyValueFieldContainer extends Component {
    constructor() {
        super();
        this.state = {
            edit: false,
            merchant: undefined,
            category: undefined,
            budget_item: undefined
        }
        this.handleStartEdit = this.handleStartEdit.bind(this)
        this.handleFieldSubmit = this.handleFieldSubmit.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
    }

    componentDidMount() {
        let merchant = this.props.object === 'merchant' ? this.props.value : undefined
        let category = this.props.object === 'category' ? this.props.value : undefined
        let budget_item = this.props.object === 'budgetItem' ? this.props.value : undefined

        this.setState(() => {
            return {
                merchant: merchant,
                category: category,
                budget_item: budget_item
            }
        })
                
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.edit !== this.state.edit) {
            InitializeSelectors();
        }

    }

    handleStartEdit(e) {
        e.preventDefault()
        this.setState({edit:true})
    }

    async handleFieldSubmit(e) {
        await e.preventDefault()
        let transactionId = this.props.transaction.id
        let merchant = this.state.merchant
        let category = this.state.category
        let budget_item = this.state.budget_item

        try {
            await CategoriseTransaction(transactionId, merchant, category, budget_item)

        } catch(error) {
            Message(error, 'error')
        }
        await this.setState({edit:false})
        await LoadTransaction(this.props.transaction.id)
    }


    async handleFieldChange(e) {
        let merchant = this.props.object === 'merchant' ? e.target.value : undefined
        let category = this.props.object === 'category' ? e.target.value : undefined
        let budget_item = this.props.object === 'budgetItem' ? e : undefined

        if (merchant) {
            await this.setState({merchant: merchant})
        }

        if (category) {
            await this.setState({category: category})
        }

        if (budget_item) {
            await this.setState({budget_item: budget_item})
        }
    }

    render() {
        return (<div className="row" >
            <form onSubmit={this.handleFieldSubmit} >
                <KeyField 
                    title={this.props.title} 
                    editable={this.props.editable} 
                    edit={this.state.edit}/>
                    
                <ValueField 
                    object={this.props.object} 
                    value={this.props.value} 
                    editable={this.props.editable} 
                    edit={this.state.edit} 
                    handleStartEdit={this.handleStartEdit} 
                    handleFieldChange={this.handleFieldChange}/>
                {this.state.edit ? <FieldSubmitButton /> : ''}

            </form>
        </div>);
    }
}

KeyValueFieldContainer.propTypes = {
    transaction: PropTypes.object,
    transactionId: PropTypes.number,
    title: PropTypes.string.isRequired,
    value: PropTypes.string,
    editable: PropTypes.bool,
    object: PropTypes.string,
}

KeyValueFieldContainer.defaultProps = {
    value: '-',
    editable: false
}

export default KeyValueFieldContainer
