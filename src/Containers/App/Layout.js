/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import clsx from 'clsx';
import { userServices } from "../../redux/services/userServices";
import { playlistServices } from "../../redux/services/playlistServices";
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BottomPlayer from "../Home/Components/bottomPlayer";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import AlbumIcon from '@material-ui/icons/Album';
import { sidebarActions } from '../../redux/actions/sidebarActions'
import { NavLink } from 'react-router-dom'
import SearchBar from "./SearchBar";
import { auth } from '../../helpers/authHeader';
import { playerActions } from '../../redux/actions/playerActions'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		color: "white",
		backgroundColor: "#23CF5F",
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},

	BottomBar: {
		top: 'auto',
		color: "white",
		height: 100,
		backgroundColor: "#282828",
		bottom: 0,
		zIndex: theme.zIndex.drawer + 1,
	},

	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		backgroundColor: "#23CF5F",
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		backgroundColor: "#23CF5F",
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		backgroundColor: "#121212",
		color: "white",
		flexGrow: 1,
		padding: theme.spacing(3),
		marginTop: 50,
		marginBottom: 100,
		position: "relative",
		textAlign: "center",
		alignItems: "center"
	},
	Bottomgrow: {
		flexGrow: 1,
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		color: "black",
		backgroundColor: fade(theme.palette.common.white, 0.5),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.8),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
	title: {
		flexGrow: 1,
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
}));


const Layout = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [playlists, setPlaylists] = useState(null)

	useEffect(() => {
		if (props.sidebar.visibility) {
			setOpen(props.sidebar.visibility);
		}

		if (window.Spotify) {
			const token = auth.getAccessToken();
			const player = new window.Spotify.Player({
				name: "Dadou's Spotify Player",
				getOAuthToken: cb => {
					cb(token)
				},
			});

			player.addListener('initialization_error', ({message}) => {
				console.log(message);
			});
			player.addListener('authentication_error', ({message}) => {
				console.log(message);
			});
			player.addListener('account_error', ({message}) => {
				console.log(message);
			});
			player.addListener('playback_error', ({message}) => {
				console.log(message);
			});
			//player.addListener('player_state_changed', state => { console.log(state); });
			player.addListener('ready', ({device_id}) => {
				props.setDeviceId(device_id);
				console.log('Ready with Device ID', device_id);
			});
			player.addListener('not_ready', ({device_id}) => {
				console.log('Device ID has gone offline', device_id);
			});
			player.connect();
		}
		playlistServices.getCurrentUserPlaylists()
			.then(res => {
				setPlaylists(res);
			})
	}, []);

	const handleDrawerOpen = () => {
		setOpen(true);
		props.setSidebarState(true)
	};

	const handleDrawerClose = () => {
		setOpen(false);
		props.setSidebarState(false)
	};

	const logout = () => {
		userServices.logout();
	}

	const renderPlaylists = () => {
		if (playlists) {
			return playlists.items.map((element, index) => {
				return (
					<ListItem button key={`playlist${index}`} component={NavLink} to={`/playlist/${element.id}`}>
						<ListItemIcon><AlbumIcon/></ListItemIcon>
						<ListItemText disableTypography
							primary={<Typography type="body2" style={{ fontSize: "14px", color: 'black' }}>{element.name}</Typography>}
						/>
					</ListItem>
				)
			})
		}
	}

	return (
		<div className={classes.root}>
			<CssBaseline/>
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon/>
					</IconButton>
					<Typography className={classes.title} variant="h6" noWrap>
						My (sublim) Spotify
					</Typography>
					<SearchBar/>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
					</IconButton>
				</div>
				<Divider/>
				<List>
					<ListItem button key={"home"} component={NavLink} to="/home">
						<ListItemIcon><HomeIcon/></ListItemIcon>
						<ListItemText primary={"Home"}/>
					</ListItem>
					<ListItem button key={"profil"} component={NavLink} to="/profile">
						<ListItemIcon><PersonIcon/></ListItemIcon>
						<ListItemText primary={"Profil"}/>
					</ListItem>
					<ListItem button key={"search"} component={NavLink} to="/search">
						<ListItemIcon><SearchIcon/></ListItemIcon>
						<ListItemText primary={"Rechercher"}/>
					</ListItem>
					<ListItem onClick={logout} button key={"exit"}>
						<ListItemIcon>

							<ExitToAppIcon/>

						</ListItemIcon>
						<ListItemText primary={"Se deconnecter"}/>
					</ListItem>
					{renderPlaylists()}
				</List>
			</Drawer>
			<main className={classes.content}>
				{props.children}
			</main>
			<AppBar
				position="fixed"
				color="primary"
				className={classes.BottomBar}
			>
				<Toolbar>
					<BottomPlayer/>
				</Toolbar>
			</AppBar>
		</div>
	);
}

function mapStateToProps(state) {
	return ({sidebar: state.sidebar})
}

const actionCreators = {
	setSidebarState: sidebarActions.setSidebarState,
	setDeviceId: playerActions.setDevice
}

const connectedLayout = connect(mapStateToProps, actionCreators)(Layout)
export default connectedLayout