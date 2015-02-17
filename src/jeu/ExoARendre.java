package jeu;

import javax.swing.*;
import javax.swing.border.LineBorder;

import devintAPI.FenetreAbstraite;
import devintAPI.Preferences;

import java.awt.*;
import java.awt.event.*;

/** 
 * @author MEURGUES Nicolas
 *
 */

public class ExoARendre extends FenetreAbstraite implements ActionListener{

	private JButton bouton;
	private JTextArea lb1;
	
    public ExoARendre(String title) {
    	super(title);
     }
    
	protected  String wavAccueil() {
		return "../ressources/sons/accueil.wav";
	}
	
	protected  String wavRegleJeu() {
		return "../ressources/sons/aideF1.wav";
	}
	
	protected  String wavAide() {
		return "../ressources/sons/aide.wav";
	}
	
    protected void init() {
    	setLayout(new BorderLayout());
    	String text = "I'm just... Just a Raven hiding in the veil of night. Just"
    			+ "a skeleton beneath the waves, I want to die... - Derivation D -"
    			+ "Verset 6 - Acte 3 - Drakengard 3";
     	JTextArea textArea = new JTextArea (text);
     	textArea.setWrapStyleWord(true);
    	lb1 = textArea; 
    	lb1.setLineWrap(true);
    	lb1.setEditable(false);
    	lb1.setFont(new Font("Georgia",1,30));
		Preferences pref = Preferences.getData();
		Color foregroundColor = pref.getCurrentForegroundColor();
		Color backgroundColor = pref.getCurrentBackgroundColor();
		lb1.setBackground(backgroundColor);
		lb1.setForeground(foregroundColor);
		lb1.setBorder(new LineBorder(Color.GRAY,5));
		lb1.setForeground(Color.WHITE); 
    	
    	this.add(lb1,BorderLayout.CENTER);

    	bouton = new JButton();
    	bouton.setText("Bonjour à tous");
    	bouton.setBackground(new Color(50,50,255));
    	bouton.setFont(new Font("Georgia",1,30));
		bouton.setForeground(Color.WHITE); 
     	bouton.addActionListener(this);
     	this.add(bouton,BorderLayout.EAST);
   }

    public void actionPerformed(ActionEvent ae){
    	voix.stop();
     	Object source = ae.getSource();
    	if (source.equals(bouton)) {
    		String text = "Bonjour à tous";
    		voix.playText(text);
    	}
    	this.requestFocus();
    }
    
    public void keyPressed(KeyEvent e) {
    	super.keyPressed(e);
    	if (e.getKeyCode()==KeyEvent.VK_F5){
    	   	voix.playText("Vous venez d'appuyer sur F5");
    	}
    }
    
	public  void changeColor() {
		Preferences pref = Preferences.getData();
		Color background = pref.getCurrentBackgroundColor();
		Color foreground = pref.getCurrentForegroundColor();
		lb1.setBackground(background);
		lb1.setForeground(foreground);
		bouton.setBackground(background);
		bouton.setForeground(foreground);
	}
	
	public void changeSize(){
		Font f = Preferences.getData().getCurrentFont();
		lb1.setFont(f);
		bouton.setFont(f);
	}

}
